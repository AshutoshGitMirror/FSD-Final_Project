const SOURCES = [
  {
    name: "Hindustan Times Mumbai",
    url: "https://www.hindustantimes.com/feeds/rss/cities/mumbai-news/rssfeed.xml"
  },
  {
    name: "Times of India Mumbai",
    url: "https://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms"
  },
  {
    name: "Indian Express Mumbai",
    url: "https://indianexpress.com/section/cities/mumbai/feed/"
  },
  {
    name: "The Hindu Mumbai",
    url: "https://www.thehindu.com/news/cities/mumbai/feeder/default.rss"
  }
];

const RELEVANCE_KEYWORDS = [
  "heat",
  "heatwave",
  "temperature",
  "imd",
  "mausam",
  "orange alert",
  "red alert",
  "weather alert",
  "hot weather",
  "mumbai weather"
];

const MAX_RESULTS = 5;

const stripHtml = (text) =>
  (text ?? "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const decodeXml = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return decodeXml(stripHtml(match?.[1] ?? ""));
};

const parseItems = (rssXml) => {
  const itemBlocks = rssXml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return itemBlocks.map((itemXml) => ({
    title: extractTag(itemXml, "title"),
    message: extractTag(itemXml, "description") || extractTag(itemXml, "content:encoded"),
    link: extractTag(itemXml, "link"),
    publishedAt: extractTag(itemXml, "pubDate")
  }));
};

const isRelevant = (item) => {
  const content = `${item.title} ${item.message}`.toLowerCase();
  return RELEVANCE_KEYWORDS.some((keyword) => content.includes(keyword));
};

const fetchTextWithTimeout = async (fetchImpl, url, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (!response.ok) {
      return null;
    }
    return response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const priorityFromContent = (text) => {
  const value = text.toLowerCase();
  if (value.includes("red alert") || value.includes("severe") || value.includes("heatwave")) {
    return "high";
  }
  if (value.includes("orange alert") || value.includes("warning") || value.includes("imd")) {
    return "moderate";
  }
  return "low";
};

const safeIsoDate = (raw) => {
  if (!raw) {
    return new Date().toISOString();
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
};

export const fetchExternalAdvisories = async (fetchImpl = fetch) => {
  const seen = new Set();
  const advisories = [];

  for (const source of SOURCES) {
    const xml = await fetchTextWithTimeout(fetchImpl, source.url);
    if (!xml) {
      continue;
    }

    const items = parseItems(xml).filter((item) => item.title && item.link);
    for (const item of items) {
      if (!isRelevant(item)) {
        continue;
      }
      const key = `${item.title}::${item.link}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      advisories.push({
        id: `ext-${source.name.replace(/\s+/g, "-").toLowerCase()}-${seen.size}`,
        wardCode: null,
        title: item.title,
        message: item.message.slice(0, 280),
        language: "en",
        priority: priorityFromContent(`${item.title} ${item.message}`),
        public: true,
        sourceUrl: item.link,
        sourceName: source.name,
        createdAt: safeIsoDate(item.publishedAt)
      });
    }
  }

  return advisories
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, MAX_RESULTS);
};
