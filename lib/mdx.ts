import 'server-only';

import type { PluggableList } from 'unified';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

export const mdxRemarkPlugins: PluggableList = [
  remarkGfm,
  remarkSmartypants,
];

export const mdxRehypePlugins: PluggableList = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'wrap',
    },
  ],
];

export async function compileMdx<TFrontmatter extends Record<string, unknown>>(
  source: string,
) {
  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: mdxRemarkPlugins,
        rehypePlugins: mdxRehypePlugins,
        format: 'mdx',
      },
    },
  });

  return { content, frontmatter } as const;
}


