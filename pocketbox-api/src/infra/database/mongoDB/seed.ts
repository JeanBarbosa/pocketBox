import 'dotenv/config';
import mongoose from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProductSchema } from './schemas/product.schema';

// URL de conexão com o MongoDB local
const mongoUrl = 'mongodb://root:example@localhost:27017/admin';

// Dados para inserir
const userData = [
  {
    username: 'Ciele',
    email: 'ciele@gmail.com',
    password: '$2a$10$eS4KlMJdBpQFDAg/V.jdAuHi/GLWvOwuvtxflmJwZsvY4WY3omqwy',
  },
  {
    username: 'Jorge',
    email: 'jorge@gmail.com',
    password: '$2a$10$HTC8wiLpdJ6sQSavxSDNju4t.LXG7c2SWulTJkiSNLmg.vRtjDP26',
  },
];

const productsData = [
  {
    name: 'sansumg s24',
    userId: '66653d748773916b6c9e5fe1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/pocketbox-82799.appspot.com/o/images%2F6e01cf1d-526a-4f35-874d-3ab5bd3aa27d.jpeg?alt=media',
    quantity: 10,
    price: 5000,
    category: 'SMARTPHONE',
    description:
      'Lorem ipsum dolor sit amet. Ab ullam explicabo et magni praesentium es…',
  },
  {
    name: 'Iphone 13',
    userId: '66653d748773916b6c9e5fe1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/pocketbox-82799.appspot.com/o/images%2F6e01cf1d-526a-4f35-874d-3ab5bd3aa27d.jpeg?alt=media',
    quantity: 10,
    price: 8000,
    category: 'SMARTPHONE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus enim, rutrum in rhoncus a, ullamcorper dictum lacus. Donec et ligula vitae purus lacinia varius.',
  },
  {
    name: 'Xiaomi 12',
    userId: '66653d748773916b6c9e5fe1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/pocketbox-82799.appspot.com/o/images%2F6e01cf1d-526a-4f35-874d-3ab5bd3aa27d.jpeg?alt=media',
    quantity: 10,
    price: 8000,
    category: 'SMARTPHONE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus enim, rutrum in rhoncus a, ullamcorper dictum lacus. Donec et ligula vitae purus lacinia varius.',
  },
];

async function seed() {
  try {
    // Conectar ao banco de dados
    await mongoose.connect(mongoUrl, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    const User = mongoose.model('User', UserSchema);
    const Product = mongoose.model('Product', ProductSchema);

    // Limpar a coleção antes de inserir
    await User.deleteMany({});
    await Product.deleteMany({});

    // Inserir os dados
    await User.insertMany(userData);
    await Product.insertMany(productsData);

    console.log('Seed executada com sucesso');
  } catch (error) {
    console.error('Erro ao executar seed:', error);
  } finally {
    // Desconectar do banco de dados
    await mongoose.disconnect();
  }
}

seed();
