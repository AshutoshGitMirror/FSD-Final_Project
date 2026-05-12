const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    req.body = parsed.body ?? req.body;
    req.query = parsed.query ?? req.query;
    req.params = parsed.params ?? req.params;
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    next(err);
  }
};

const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    std: z.number().int().min(1).max(12, 'Standard must be between 1 and 12'),
    board: z.enum(['CBSE', 'ICSE', 'IB', 'State Board'], 'Invalid board')
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
  })
});

const chatSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
    isThinking: z.boolean().optional(),
    subject: z.string().optional(),
    chapter: z.string().optional()
  })
});

const feynmanSchema = z.object({
  body: z.object({
    concept: z.string().min(1, 'Concept is required'),
    messages: z.array(z.object({
      role: z.string(),
      content: z.string()
    })).min(1, 'At least one message is required')
  })
});

const curriculumQuerySchema = z.object({
  query: z.object({
    std: z.string().regex(/^\d+$/, 'std must be a number').optional(),
    board: z.enum(['CBSE', 'ICSE', 'IB', 'State Board']).optional()
  })
});

const quizParamsSchema = z.object({
  params: z.object({
    subject: z.string().min(1),
    chapter: z.string().min(1)
  })
});

const kgQuerySchema = z.object({
  query: z.object({
    std: z.string().regex(/^\d+$/, 'std must be a number'),
    board: z.string().min(1, 'board is required'),
    subject: z.string().min(1, 'subject is required')
  })
});

const progressPostSchema = z.object({
  body: z.object({
    subjectName: z.string().min(1),
    chapterName: z.string().min(1),
    quizScore: z.number().min(0),
    totalQuestions: z.number().int().positive('totalQuestions must be positive'),
    isCompleted: z.boolean()
  })
});

const feedbackSchema = z.object({
  body: z.object({
    messageId: z.string().min(1),
    rating: z.number().int().min(-1).max(1),
    confidence: z.number().min(0).max(100).optional(),
    comment: z.string().max(500).optional()
  })
});

const linkSaveSchema = z.object({
  body: z.object({
    url: z.string().url('Invalid URL format'),
    title: z.string().optional(),
    source: z.enum(['youtube', 'shaalaa']).optional()
  })
});

const srInitSchema = z.object({
  body: z.object({
    subjectName: z.string().min(1),
    chapterName: z.string().min(1)
  })
});

const srReviewSchema = z.object({
  body: z.object({
    conceptId: z.string().min(1),
    quality: z.number().int().min(0).max(5)
  })
});

module.exports = {
  validate,
  schemas: {
    registerSchema,
    loginSchema,
    chatSchema,
    feynmanSchema,
    curriculumQuerySchema,
    quizParamsSchema,
    kgQuerySchema,
    progressPostSchema,
    feedbackSchema,
    linkSaveSchema,
    srInitSchema,
    srReviewSchema
  }
};
