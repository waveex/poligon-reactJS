import push from 'git-push';

const remote = {
  name: 'production',
  url: 'http://github.com/waveex/poligon-reactJS',
  branch: 'gh-pages'
};

export default async () => {
  await build();
  await new Promise(resolve => push('./build', remote, resolve));
}