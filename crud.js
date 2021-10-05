const fs = require("fs");
const path = require("path");
const { dialog } = require("electron").remote;

var displayOutput;
var bookNum;
var readBookHtml;
var bookNum;

//抓取檔案路徑&讀取檔案內容
let pathName = path.join(__dirname, "File");

let file = path.join(pathName, "bookFile.csv");

var data = fs.readFileSync(file, "utf8");

if (data != "") {
  var dataJson = JSON.parse(data);
} else {
  var dataJson = JSON.parse('{"Book":[]}');
}

//新增書本
newBook = document.getElementById("Creat");

newBook.addEventListener("click", function () {
  document.getElementById("editBook").style.display = "none";
  displayOutput = "";
  document.getElementById("disPlayBook").innerText = displayOutput;

  // document.getElementById("newBookId").innerText = (dataJson.Book.length) + 1;
  document.getElementById("newBookId").innerHTML = (dataJson.Book.length) + 1;
  console.log("newBookId的value值:"+document.getElementById("newBookId").value);

  var bookId = document.getElementById("newBookId").value;

  //新增書本id一定必輸入
  if (document.getElementById("newBookId").value != (dataJson.Book.length) + 1) {
    document.getElementById("newBookId").value = (dataJson.Book.length) + 1;
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "該本書流水號應該為:" + ((dataJson.Book.length) + 1),
    });
    return false;
  }
  //新增書本id為唯一值
  for (book of dataJson.Book) {
    if (bookId === book.id) {
      dialog.showMessageBox({
        title: "注意!",
        buttons: ["好"],
        type: "warning",
        message: "已存在相同流水號書本\n請重新輸入資料!!!",
      });
      return false;
    }
  }

  var isbnId = document.getElementById("newBookISBN").value;
  var nameId = document.getElementById("newBookName").value;
  var typeId = document.getElementById("newBookTypeNum").value;
  var authId = document.getElementById("newBookAuthor").value;
  var publisherId = document.getElementById("newBookPublisher").value;
  var birthId = document.getElementById("newBookBirth").value;
  var memoId = document.getElementById("newBookMemo").value;

  var jsonObj = {
    id: bookId,
    isbn: isbnId,
    name: nameId,
    type: typeId,
    auth: authId,
    publisher: publisherId,
    birth: birthId,
    memo: memoId,
  };

  dataJson["Book"].push(jsonObj);

  let content = JSON.stringify(dataJson);

  //寫入新增書本資料
  fs.writeFile(file, content, function (err) {
    if (err) console.log(err);
    else
      var creatOutput =
        "流水號：" +
        bookId +
        "\nISBN：" +
        isbnId +
        "\n書名：" +
        nameId +
        "\n分類號：" +
        typeId +
        "\n作者：" +
        authId +
        "\n出版社：" +
        publisherId +
        "\n出版年：" +
        birthId +
        "\n備註：" +
        memoId;
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "新增書本完成!!!\n新增書本內容為：\n" + creatOutput,
    });
  });
});

//查詢書本
readBook = document.getElementById("Read");

readBook.addEventListener("click", function () {
  //把顯示書本的欄位重置
  displayOutput = "";
  document.getElementById("disPlayBook").innerText = displayOutput;
  readBookHtml = "";

  var bookId = document.getElementById("newBookId").value;
  var isbnId = document.getElementById("newBookISBN").value;
  var nameId = document.getElementById("newBookName").value;
  var typeId = document.getElementById("newBookTypeNum").value;
  var authId = document.getElementById("newBookAuthor").value;
  var publisherId = document.getElementById("newBookPublisher").value;
  var birthId = document.getElementById("newBookBirth").value;
  var memoId = document.getElementById("newBookMemo").value;

  if (
    bookId == "" &&
    isbnId == "" &&
    nameId == "" &&
    typeId == "" &&
    authId == "" &&
    publisherId == "" &&
    birthId == "" &&
    memoId == ""
  ) {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "查詢書本條件不可全為空\n請輸入查詢條件!!!",
    });
    document.getElementById("disPlayBook").innerText = "";
    return false;
  }

  for (book of dataJson.Book) {
    if (
      (isbnId == "" || book.isbn === isbnId) &&
      (nameId == "" || book.name === nameId) &&
      (typeId == "" || book.type === typeId) &&
      (authId == "" || book.auth === authId) &&
      (publisherId == "" || book.publisher === publisherId) &&
      (birthId == "" || book.birth === birthId) &&
      (memoId == "" || book.memo === memoId) &&
      (bookId == "" || bookId === book.id)
    ) {
      displayOutput =
        "流水號：" +
        book.id +
        "，ISBN：" +
        book.isbn +
        "，書名：" +
        book.name +
        "，分類號：" +
        book.type +
        "，作者：" +
        book.auth +
        "，出版社：" +
        book.publisher +
        "，出版年：" +
        book.birth +
        "，備註：" +
        book.memo +
        "\n";
      readBookHtml += "<p id='bookList'>" + displayOutput + "</p><br />";
    }
  }
  if (readBookHtml == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "查詢條件搜索不到書本\n請確認查詢條件!!!",
    });
    document.getElementById("disPlayBook").innerText = "";
    return false;
  }
  document.getElementById("disPlayBook").innerHTML = readBookHtml;
});

//查詢所有書本
readAllBook = document.getElementById("ReadAll");

readAllBook.addEventListener("click", function () {
  displayOutput = "";
  document.getElementById("disPlayBook").innerText = displayOutput;
  readBookHtml = "";

  for (book of dataJson.Book) {
    displayOutput =
      "流水號：" +
      book.id +
      "，ISBN：" +
      book.isbn +
      "，書名：" +
      book.name +
      "，分類號：" +
      book.type +
      "，作者：" +
      book.auth +
      "，出版社：" +
      book.publisher +
      "，出版年：" +
      book.birth +
      "，備註：" +
      book.memo;
    readBookHtml += "<p id='bookList'>" + displayOutput + "</p><br />";
  }

  if (displayOutput == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "目前庫存無任何書本資料\n請先新增書本資訊!!!",
    });
    return false;
  }

  document.getElementById("disPlayBook").innerHTML = readBookHtml;
});

//編輯書本
updateBook = document.getElementById("Update");

updateBook.addEventListener("click", function () {
  readBookHtml = "";
  displayOutput = "";
  bookNum = 0;

  var bookId = document.getElementById("newBookId").value;
  var isbnId = document.getElementById("newBookISBN").value;
  var nameId = document.getElementById("newBookName").value;
  var typeId = document.getElementById("newBookTypeNum").value;
  var authId = document.getElementById("newBookAuthor").value;
  var publisherId = document.getElementById("newBookPublisher").value;
  var birthId = document.getElementById("newBookBirth").value;
  var memoId = document.getElementById("newBookMemo").value;

  if (
    isbnId != "" ||
    nameId != "" ||
    typeId != "" ||
    authId != "" ||
    publisherId != "" ||
    birthId != "" ||
    memoId != ""
  ) {
    document.getElementById("newBookISBN").value = "";
    document.getElementById("newBookName").value = "";
    document.getElementById("newBookTypeNum").value = "";
    document.getElementById("newBookAuthor").value = "";
    document.getElementById("newBookPublisher").value = "";
    document.getElementById("newBookBirth").value = "";
    document.getElementById("newBookMemo").value = "";
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "編輯書本只可輸入流水號\n請重新輸入!!!",
    });
    return false;
  }
  //編輯書本id一定必輸入
  if (bookId == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "欲編輯書本流水號不可為空!!!",
    });
    return false;
  }
  //編輯書本id查詢不到
  if (dataJson.Book == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "目前無書本庫存可以編輯\n請先新增書本資訊!!!",
    });
    return false;
  }
  var isLook = false;
  for (book of dataJson.Book) {
    if (bookId === book.id) {
      isLook = true;
    }
  }
  if (!isLook) {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "欲編輯書本不存在\n請重新輸入!!!",
    });
    return false;
  }
  var count = -1;
  var find;

  for (book of dataJson.Book) {
    count += 1;
    if (book.id === bookId) {
      document.getElementById("editBookId").value = book.id;
      document.getElementById("editBookISBN").value = book.isbn;
      document.getElementById("editBookName").value = book.name;
      document.getElementById("editBookTypeNum").value = book.type;
      document.getElementById("editBookAuthor").value = book.auth;
      document.getElementById("editBookPublisher").value = book.publisher;
      document.getElementById("editBookBirth").value = book.birth;
      document.getElementById("editBookMemo").value = book.memo;

      displayOutput =
        "流水號：" +
        book.id +
        "，ISBN：" +
        book.isbn +
        "，書名：" +
        book.name +
        "，分類號：" +
        book.type +
        "，作者：" +
        book.auth +
        "，出版社：" +
        book.publisher +
        "，出版年：" +
        book.birth +
        "，備註：" +
        book.memo;
      readBookHtml = "<p id='bookList'>" + displayOutput + "</p><br />";
      find = count;
    }
  }
  document.getElementById("disPlayBook").innerHTML = readBookHtml;
  document.getElementById("editBook").style.display = "block";
});

saveBook = document.getElementById("Save");

saveBook.addEventListener("click", function () {
  var tempString = document.getElementById("disPlayBook").innerHTML;

  var tempArray1 = new Array();
  tempArray1 = tempString.split("，ISBN");

  var tempArray2 = new Array();
  tempArray2 = tempArray1[0].split("流水號：");
  console.log("tempArray2[0]:" + tempArray2[0]);
  console.log("tempArray2[1]:" + tempArray2[1]);

  var find;
  readBookHtml = "";
  displayOutput = "";

  var newBookId = document.getElementById("newBookId").value;

  if (tempArray2[1] != newBookId) {
    document.getElementById("newBookId").value = tempArray2[1];
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "請勿變更欲編輯書本流水號!!!",
    });
  }
  var editBookId = document.getElementById("editBookId").value;

  if (editBookId == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "變更書本流水號不可為空\n請確認!!!",
    });
    return false;
  }

  if (editBookId != tempArray2[1]) {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "書本流水號不可變更請確認!!!",
    });
    return false;
  }

  var editIsbnId = document.getElementById("editBookISBN").value;
  var editNameId = document.getElementById("editBookName").value;
  var editTypeId = document.getElementById("editBookTypeNum").value;
  var editAuthId = document.getElementById("editBookAuthor").value;
  var editPublisherId = document.getElementById("editBookPublisher").value;
  var editBirthId = document.getElementById("editBookBirth").value;
  var editMemoId = document.getElementById("editBookMemo").value;
  console.log("dataJson:" + dataJson.Book);
  var tempIsbn;
  var tempName;
  var tempType;
  var tempAuth;
  var tempPublisher;
  var tempBirth;
  var tempMemo;
  var count = 0;
  for (book of dataJson.Book) {
    if (book.id == tempArray2[1]) {
      tempIsbn = book.isbn;
      tempName = book.name;
      tempType = book.type;
      tempAuth = book.auth;
      tempPublisher = book.publisher;
      tempBirth = book.birth;
      tempMemo = book.memo;
      find = count;
    }
    count++;
  }
  console.log(
    "tempIsbn:" +
    tempIsbn +
    ",tempName:" +
    tempName +
    ",tempType:" +
    tempType +
    ",tempAuth:" +
    tempAuth +
    ",tempPublisher:" +
    tempPublisher +
    ",tempBirth:" +
    tempBirth +
    ",tempMemo:" +
    tempMemo
  );

  if (
    tempIsbn == editIsbnId &&
    tempName == editNameId &&
    tempType == editTypeId &&
    tempAuth == editAuthId &&
    tempPublisher == editPublisherId &&
    tempBirth == editBirthId &&
    tempMemo == editMemoId
  ) {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "沒有修改書本任何值\n請確認!!!",
    });
    return false;
  } else {
    var editBook = "";
    editBook +=
      "流水號：" +
      tempArray2[1] +
      "\nISBN：" +
      tempIsbn +
      "\n書名：" +
      tempName +
      "\n分類號：" +
      tempType +
      "\n作者：" +
      tempAuth +
      "\n出版社：" +
      tempPublisher +
      "\n出版年：" +
      tempBirth +
      "\n備註：" +
      tempMemo +
      "\n";
    var editCheck = confirm("確定欲修改該書本?\n" + editBook);
    if (editCheck == true) {
      dataJson.Book[find].isbn = editIsbnId;
      dataJson.Book[find].name = editNameId;
      dataJson.Book[find].type = editTypeId;
      dataJson.Book[find].auth = editAuthId;
      dataJson.Book[find].publisher = editPublisherId;
      dataJson.Book[find].birth = editBirthId;
      dataJson.Book[find].memo = editMemoId;
    } else {
      dialog.showMessageBox({
        title: "注意!",
        buttons: ["好"],
        type: "warning",
        message: "已取消編輯書本!",
      });
      return false;
    }
  }

  let content = JSON.stringify(dataJson);

  //寫入編輯書本資料
  fs.writeFile(file, content, function (err) {
    if (err) console.log(err);
    else
      var editOutput =
        "流水號：" +
        editBookId +
        "\nISBN：" +
        editIsbnId +
        "\n書名：" +
        editNameId +
        "\n分類號：" +
        editTypeId +
        "\n作者：" +
        editAuthId +
        "\n出版社：" +
        editPublisherId +
        "\n出版年：" +
        editBirthId +
        "\n備註：" +
        editMemoId;
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "修改書本完成!修改成:\n" + editOutput,
    });
    document.getElementById("editBook").style.display = "none";
    document.getElementById("disPlayBook").innerText = "";
  });
});

//取消編輯
cancelEdit = document.getElementById("Cancel");
cancelEdit.addEventListener("click", function () {
  document.getElementById("editBook").style.display = "none";
});

//刪除書本
deleteBook = document.getElementById("Delete");

deleteBook.addEventListener("click", function () {
  document.getElementById("editBook").style.display = "none";

  displayOutput = "";
  document.getElementById("disPlayBook").innerText = displayOutput;

  var bookId = document.getElementById("newBookId").value;
  var isbnId = document.getElementById("newBookISBN").value;
  var nameId = document.getElementById("newBookName").value;
  var typeId = document.getElementById("newBookTypeNum").value;
  var authId = document.getElementById("newBookAuthor").value;
  var publisherId = document.getElementById("newBookPublisher").value;
  var birthId = document.getElementById("newBookBirth").value;
  var memoId = document.getElementById("newBookMemo").value;

  if (
    isbnId != "" ||
    nameId != "" ||
    typeId != "" ||
    authId != "" ||
    publisherId != "" ||
    birthId != "" ||
    memoId != ""
  ) {
    document.getElementById("newBookISBN").value = "";
    document.getElementById("newBookName").value = "";
    document.getElementById("newBookTypeNum").value = "";
    document.getElementById("newBookAuthor").value = "";
    document.getElementById("newBookPublisher").value = "";
    document.getElementById("newBookBirth").value = "";
    document.getElementById("newBookMemo").value = "";
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "刪除書本只可輸入流水號\n請重新輸入!!!",
    });
    return false;
  }

  //刪除書本id一定必輸入
  if (bookId == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "刪除書本流水號不可為空",
    });
    return false;
  }
  //刪除書本id查詢不到
  if (dataJson.Book == "") {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "刪除書本流水號不可為空",
    });
    return false;
  }
  var isLook = false;
  for (book of dataJson.Book) {
    if (bookId === book.id) {
      isLook = true;
    }
  }
  if (!isLook) {
    dialog.showMessageBox({
      title: "注意!",
      buttons: ["好"],
      type: "warning",
      message: "欲刪除書本不存在\n請重新輸入!!!",
    });
    return false;
  }

  //來算輸入欲刪除流水號對應書本是第幾個json
  var count = -1;

  for (book of dataJson.Book) {
    count += 1;
    if (book.id === bookId) {
      console.log("刪除前的書本庫存:" + JSON.stringify(dataJson));
      console.log("刪除的書本：" + JSON.stringify(book));
      var deleteBook = "";
      deleteBook +=
        "流水號：" +
        book.id +
        "\nISBN：" +
        book.isbn +
        "\n書名：" +
        book.name +
        "\n分類號：" +
        book.type +
        "\n作者：" +
        book.auth +
        "\n出版社：" +
        book.publisher +
        "\n出版年：" +
        book.birth +
        "\n備註：" +
        book.memo +
        "\n";
      var check = confirm("確定刪除該書本?\n" + deleteBook);
      if (check == true) {
        document.getElementById("newBookId").value = "";
        console.log("欲刪除陣列:[" + count + "]");
        dataJson.Book.splice(count, 1);
        console.log("刪除後的書本庫存:" + JSON.stringify(dataJson));

        if (dataJson.Book == "") {
          fs.writeFile(file, "", function (err) {
            if (err) console.log(err);
          });
          dialog.showMessageBox({
            title: "注意!",
            buttons: ["好"],
            type: "warning",
            message: "已把所有庫存書本刪除乾淨!!!\n請新增書本資訊!!!",
          });
          return false;
        } else {
          fs.writeFile(file, JSON.stringify(dataJson), function (err) {
            if (err) console.log(err);
          });
          dialog.showMessageBox({
            title: "注意!",
            buttons: ["好"],
            type: "warning",
            message: "已刪除該書本!!!",
          });
          return false;
        }
      } else {
        dialog.showMessageBox({
          title: "注意!",
          buttons: ["好"],
          type: "warning",
          message: "已取消刪除該書本!!!",
        });
        return false;
      }
    }
  }
});

//將列出書本清單部分清除
ClearBook = document.getElementById("Clear");

ClearBook.addEventListener("click", function () {
  document.getElementById("editBook").style.display = "none";
  document.getElementById("disPlayBook").innerText = "";
});