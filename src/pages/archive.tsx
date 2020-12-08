import { defineComponent, useMeta, computed } from '@nuxtjs/composition-api';

import LayoutHeader from '../components/LayoutHeader';
import { convertDateToSimpleFormat } from '~/utils/date';

const pageTitle = 'Archive';
const pageDescription = 'これまでに公開した記事の一覧です。';

type PropsArchive = {
  title: string;
  date: string;
  path: string;
};

type StringKeyObject = {
  [key: string]: any;
};

const formatArchive = (archives: Array<PropsArchive>) => {
  const formatArchives: StringKeyObject = {};

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

export default defineComponent({
  name: 'Archive',
  setup(_, { root }) {
    useMeta({
      title: pageTitle,
      meta: [{ hid: 'description', name: 'description', content: pageDescription }],
    });

    // @ts-ignore
    const archives = computed(() => formatArchive(root.context.$source.archives));

    return {
      archives,
    };
  },
  head() {
    return {};
  },
  render() {
    return (
      <article class="archive">
        <LayoutHeader heading={pageTitle} description={pageDescription} />
        <section>
          {Object.keys(this.archives).map((key: any) => (
            <div class="archive-list">
              <div class="archive-year">
                <h2 class="archive-year__title">{key}</h2>
              </div>
              <div class="archive-post">
                {this.archives[key].map((post: PropsArchive) => (
                  <router-link to={post.path} class="archive-post-item">
                    <div class="archive-post-item__title">{post.title}</div>
                    <time datetime={post.date} class="archive-post-item__date">
                      {convertDateToSimpleFormat(post.date)}
                    </time>
                  </router-link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </article>
    );
  },
});