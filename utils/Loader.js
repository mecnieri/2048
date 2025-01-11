export function customLoader(assetsObj, onAssetsLoaded) {
  for (let key in assetsObj) { PIXI.Assets.add(key, assetsObj[key]); }
  const keys = Object.keys(assetsObj)
  PIXI.Assets.load(keys).then(onAssetsLoaded)
  // PIXI.Assets.load(keys, p => console.log(p.toFixed(2) * 100 + "%")).then(onAssetsLoaded)
}
