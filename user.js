const express=require('express')
const router=express.Router()
const fs=require('fs')
const path=require('path')
const books=require('../books.json')
router.use(express.json())
router.use(express.urlencoded({extended:false}))




router.get('/books',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','books.json'))
})
router.get('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);
        
        if (book) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(book));
        } else {
          res.statusCode = 404;
          res.send("Bunday id raqamli kitob yo\'q");
        }
})
router.post('/books',(req,res)=>{
  const { title, author } = req.body;
  if(!title||!author){
  return  res.send('Title yoki autor kiritmadingiz')
  }
  const checkbook=books.find(book=>book.title===title)
  console.log(checkbook)
  if(checkbook){
  return  res.send('Bu kitob bazada bor')
  }
  const newBook={
    id:books.length+1, 
    title,
    author
  }
  books.push(newBook)
  
  fs.writeFile(path.join(__dirname,'..', 'books.json'), JSON.stringify(books, null, 2), (err) => {
    if (err) {
        return res.status(500).send('Server xatosi: Ma\'lumotni saqlab bo\'lmadi');
    }
  return  res.status(201).json(newBook);
});
 })
 router.put('/books/:id',(req,res)=>{
  const bookId = parseInt(req.params.id);
  const { id,title, author } = req.body;
  const book = books.findIndex((b) => b.id === bookId);
  if(!title||!author){
    console.log('1')
    return  res.send('Ma\'lumotlarni to\'liq yangilash uchun id title va authorni  to\'liq kiriting')
    }
  else if (book!==-1) {
    console.log('2')
    books[book].id=id
    books[book].title=title
    books[book].author=author
  console.log(books)
  fs.writeFile(path.join(__dirname,'..', 'books.json'), JSON.stringify(books, null, 2), (err) => {
    if (err) {
        return res.status(500).send('Server xatosi: Ma\'lumotni saqlab bo\'lmadi');
    }
  return  res.send(books[book.id-1])
});


    
  } else {
    res.statusCode = 404;
  return  res.send("Ma\'lumot topilmadi");
  }
  
 })
 router.delete('/books/:id',(req,res)=>{
  const bookId = parseInt(req.params.id);
  const book = books.findIndex((b) => b.id === bookId);
      if (book!==-1) {
        books.splice(book,1)
        fs.writeFile(path.join(__dirname,'..', 'books.json'), JSON.stringify(books, null, 2), (err) => {
          if (err) {
              return res.status(500).send('Server xatosi: Ma\'lumotni saqlab bo\'lmadi');
          }
        return  res.send("muvaffaqiyatli o\'chirildi")
      });      
      }
      else {
      return  res.send("bunday id raqamli kitob yo\'q")
      }
  
             
      
})



module.exports=router