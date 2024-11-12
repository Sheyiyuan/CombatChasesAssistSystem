//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG

function main() {
  // 首先检查是否已经存在
  let ext = seal.ext.find('CCAS');
  if (!ext) {
    // 不存在，那么建立扩展，名为CCAS，作者“Sheyiyuan 冰红茶”，版本1.0.0
    ext = seal.ext.new('CCAS', 'Sheyiyuan 冰红茶', '1.0.0');
    // 注册扩展
    seal.ext.register(ext);
  }

  //总帮助文档
  const cmdCCAS = seal.ext.newCmdItemInfo();
  cmdCCAS.name = 'CCAS';
  cmdCCAS.help = helpMsg["CCAS"];
  cmdCCAS.solve = (_ctx, _msg, _cmdArgs) => {
    const ret = seal.ext.newCmdExecuteResult(true);
    ret.showHelp = true;
    return ret;
  };
  ext.cmdMap['CCAS'] = cmdCCAS;




}
main();
