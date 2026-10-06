for (const path of process.argv.slice(2)) {
  const r = await fetch('http://localhost:4321' + path);
  const t = await r.text();
  const title = t.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = t.match(/name="description" content="([^"]*)"/)?.[1];
  console.log(path);
  console.log('  title (' + (title?.length ?? 0) + '):', title);
  console.log('  desc  (' + (desc?.length ?? 0) + '):', desc?.slice(0, 170));
}
