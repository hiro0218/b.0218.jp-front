import fs from 'fs-extra';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';

import HoverCard from '@/components/HoverCard';
import PageContainer from '@/components/layout/PageContainer';
import { SITE } from '@/constant';
import { Archives } from '@/types/source';

interface Props {
  archives: Array<Archives>;
}

const divideByYearArchive = (archives: Array<Archives>) => {
  const formatArchives = {};

  for (let i = 0; i < archives.length; i++) {
    const post = archives[i];

    // 日付を取得する
    const date = new Date(post.date);
    const year = date.getFullYear().toString() + ' ';

    // 配列で初期化
    if (!Array.isArray(formatArchives[year])) {
      formatArchives[year] = [];
    }

    formatArchives[year].push(post);
  }

  return formatArchives;
};

const Archive = ({ archives }: Props) => {
  const posts = divideByYearArchive(archives);

  return (
    <>
      <Head>
        <title key="title">Archive - {SITE.NAME}</title>
      </Head>

      <PageContainer>
        <article className="p-archive">
          <header className="l-section-header">
            <h1 className="c-heading">Archive</h1>
          </header>

          <section className="p-archive__contents">
            {Object.keys(posts).map((key: string) => {
              return (
                <div key={key} className="archive-list">
                  <div className="archive-year">
                    <h2 className="archive-year__title">{key}</h2>
                  </div>
                  <ul className="l-menu-list archive-post">
                    {posts[key].map((post: Archives, index: number) => {
                      return (
                        <li key={index} className="l-menu-list__item">
                          <HoverCard
                            link={'/' + post.path}
                            title={post.title}
                            date={post.date}
                            excerpt={post.excerpt}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </section>
        </article>
      </PageContainer>
    </>
  );
};

export default Archive;

export const getStaticProps: GetStaticProps = async () => {
  const dataPath = path.join(process.cwd(), '_source/archives.json');
  const posts: Array<Archives> = fs.readJsonSync(dataPath);

  return {
    props: {
      archives: posts,
    },
  };
};