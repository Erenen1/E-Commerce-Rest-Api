# E-Commerce Rest API

Bu proje, E-Commerce uygulaması için bir REST API'sidir. Bu projeyi geliştirirken aşağıdaki teknolojileri ve yöntemleri öğrendim ve uyguladım:

## Öğrendiklerim

### Teknolojiler

- **Node.js ve Express.js**: API geliştirme için kullanıldı.
- **TypeScript**: Daha güçlü tip kontrolü ve kod okunabilirliği için kullanıldı.
- **MongoDB**: Veritabanı yönetimi için kullanıldı.
- **JWT (JSON Web Token)**: Kullanıcı kimlik doğrulaması için kullanıldı.
- **Docker**: Uygulamanın containerize edilmesi için kullanıldı.
- **Swagger**: API dokümantasyonu için kullanıldı.

### Mimariler ve Desenler

- **RESTful API**: API'nin REST prensiplerine uygun olarak tasarlanması.
- **MVC (Model-View-Controller)**: Kodun daha düzenli ve okunabilir olmasını sağlamak için kullanıldı.
- **Middleware Kullanımı**: Express.js'de orta katman yazılımlarını kullanarak, kimlik doğrulama ve hata yönetimi gibi işlemleri daha modüler hale getirme.

### Uygulama Geliştirme

- **Kullanıcı Kayıt ve Giriş**: Kullanıcıların kayıt olma ve giriş yapma işlemlerinin güvenli bir şekilde yapılması.
- **Ürün ve Kategori Yönetimi**: Admin kullanıcılarının ürün ve kategori ekleme, güncelleme ve silme işlemlerini yapabilmesi.
- **Kullanıcı Yönetimi**: Kullanıcıların profillerini yönetebilmesi ve admin kullanıcılarının tüm kullanıcıları yönetebilmesi.
- **Sepet ve İstek Listesi Yönetimi**: Kullanıcıların ürünleri sepete ekleme ve istek listesi oluşturma işlemleri.

## Kurulum ve Çalıştırma

Projenin çalıştırılması için aşağıdaki adımları izleyin:

### Gereksinimler

- Node.js
- Docker

### Adımlar

1. **Projeyi Klonlayın**
    ```
    git clone https://github.com/Erenen1/E-Commerce-Rest-Api.git
    cd E-Commerce-Rest-Api
    ```

2. **Gerekli Bağımlılıkları Yükleyin**
    ```
    npm install
    ```

4. **Çevre Değişkenlerini Ayarlayın**
    - `.env.development` ve `.env.test` dosyalarını gerekli bilgilere göre doldurun.

5. **Uygulamayı Başlatın**
    ```
    npm run start:dev
    ```

### Docker ile çalıştırmak için
    ```
    git clone https://github.com/Erenen1/E-Commerce-Rest-Api.git
    cd E-Commerce-Rest-Api
    docker-compose up
    ```

### Kullanım

Swagger dokümantasyonunu kullanarak API'nin tüm endpoint'lerine erişebilir ve test edebilirsiniz. Uygulama çalıştığında Swagger UI şu adreste mevcut olacaktır: http://localhost:3000/swagger
