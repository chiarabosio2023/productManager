const express=require('express');
const socketIO = require('socket.io')
const engine = require('express-handlebars').engine
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const passportConfig = require('./config/passportConfig.js')

const productRouter = require('./routes/productRouter.js')
const cartRouter = require('./routes/cartRouter.js')
const {router, handleRealTimeProductsSocket} = require('./routes/viewRouter.js')
const sessionRouter = require('./routes/sessionsRouter.js')

const viewRouter = router

const PORT = process.env.COOKIE_SECRET || 8080
const app = express()

const io = socketIO(server)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET))

passportConfig()
app.use(passport.initialize())

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', viewRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)


app.get('*', (req, res) => {
    res.send('Error 404 - Not Found')
})

app.listen(PORT, () => {
    console.log(`Server Online en puerto ${PORT}`);
});

handleRealTimeProductsSocket(io)

const connect = async () => {
    try{
        await mongoose.connect(`mongodb+srv://chibosio:${process.env.MONGO_PASSWORD}@cluster0.3jin0k1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=ecommerce`)
        console.log("DB online...!!");z
    } catch(error){
        console.log("Conexión fallida. Detalle:", error.message);
    }
} 
connect()