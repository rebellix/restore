export default class BookstoreService {

  data = [
    {
      id: 1,
      title: 'Production-Ready Microservices',
      author: 'Susan J. Fowler',
      price: 45,
      coverImage: "https://covers.oreillystatic.com/images/0636920053675/cat.gif"
    },
    {
      id: 2,
      title: 'Release it!',
      author: 'Michael T. Nygard',
      price: 32,
      coverImage: "https://imagery.pragprog.com/products/488/mnee2_xlargecover.jpg?1489595415"
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.8) {
          resolve(this.data);
        }
        reject(new Error('OOPS! Smth went wrong'))
      }, 1000)
    })
  }

}