/**
 * Created by jeffreylaw on 12/21/15.
 */
import gulp from 'gulp';
import {spawn} from 'child_process';
import setup from '../settings';

const root = setup.PROJECT_DIR;
const nmp = root + '/node_modules/';
const confPath = root + '/build/config/';

const srcJs = root + '/src/**/*.js*';
const testJs = root + '/test/**/*.js*'

const bin = (module,isJs)=> {
  return nmp + module + '/bin/' + ((isJs) ? module + '.js' : module);
};

const conf = (file)=> {
  return (confPath + file).toString();
};

gulp.task('lint', ()=> {
  let eslint = spawn(bin('eslint',true)
    ,[
        '-c'
        , conf('.eslintrc')
        //could use eslintignore,
        //but cleaner to tell eslint what to process
        ,srcJs
        ,testJs
      ], {stdio: 'inherit'});
  eslint.on('close', (code)=> {
    console.log('eslint exited with code ' + code);
  });
});

gulp.task('default', ['lint'], ()=> {
});
