'use strict'

console.log("hello miku")

window.onload = function() {
    
    let db; 
    const dbname = "bookList"; // 名前
    const dbversion = "1.0"; // バージョン
    const dbdescription = "Test Database"; 
    const dbsize = 2 * 1024 * 1024; // size  
    
    //DBを作成する
    function OpenDatabase() {
      db = openDatabase(dbname, dbversion, dbdescription, dbsize);  
    }
    OpenDatabase(); 

    //テーブルを作成する
    function CreateTable(){
        db.transaction(
            function (transact){
            transact.executeSql("CREATE TABLE bookInfo ( author, title)", [],
                function () { print("CREATE TABLE SUCCESS");},// 成功コールバック
                function () { print("CREATE TABLE ERROR"); }// 失敗コールバック
            )}
        )}
    const make = document.getElementById("make");
    make.addEventListener("click", CreateTable); 
     
    //テーブルを削除
    function DropTable() {
        db.transaction(
          function (transact) {
            transact.executeSql("DROP TABLE IF EXISTS bookInfo", [],
              function () { print("DROP TABLE SUCCESS"); },
              function () { print("DROP TABLE ERROR"); }
            );
          });
      }
      const dropTable = document.getElementById("drop");
      dropTable.addEventListener("click", DropTable); 
  
    // コンソールに結果を出力
    function print(msg) {
        console.log(msg);
        const message = document.getElementById("msg");
        message.innerText = msg;
        setTimeout(()=> { message.innerText = ""}, 3000);
    }
    
    //本を登録する
    function insertRecord(){
        const author = document.getElementById("author");
        const title = document.getElementById("title"); 
        const dbAuthor = `'${author.value}'`; 
        const dbTitle = `'${title.value}'`; 
        db.transaction(
            function(transact){
                transact.executeSql("INSERT INTO bookInfo VALUES ( ?, ?)", [dbAuthor, dbTitle], 
                function () { print("Insert Record SUCCESS");},// 成功コールバック
                function () { print("Insert Record ERROR"); }// 失敗コールバック
                ); 
            }
        )
        title.value = "";
        author.value = ""; 
    }    
    const submitBookInfo = document.getElementById("submit");
    submitBookInfo.addEventListener("click", insertRecord); 
}

