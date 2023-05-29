import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/lib/openai";
import { z } from "zod";
import { cosineSimilarity } from "@/helpers/cosine-similarity";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;
  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res.status(401).json({
      error: "Unauthorized",
      success: false,
    });
  }

  try {
    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });
    if (!validApiKey) {
      return res.status(401).json({
        error: "Unauthorized",
        success: false,
      });
    }

    const start = new Date();
    const embedding = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data.data[0].embedding;
      })
    );
    // the similarity variable is the cosine similarity between the two embeddings, with 0 being not similar at all and 1 being very similar
    const similarity = cosineSimilarity(embedding[0], embedding[1]);

    const duration = new Date().getTime() - start.getTime();

    // persist request
    await db.apiRequest.create({
        data: {
           method: req.method as string,
            duration,
            path: req.url as string,
            status: 200,
            apiKeyId: validApiKey.id,
            usedApiKey: validApiKey.key,
        }
    })
    return res.status(200).json({
        text1,
        text2,
        similarity,
        success: true,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        success: false,
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export default withMethods(["POST"], handler);
