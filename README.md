<h1 align="center">
HUGO - Ứng dụng hỗ trợ thiết kế sản phẩm in ấn
</h1>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>📑 Mục lục</summary>
  <ol>
    <li>
      <a href="#📝-giới-thiệu-về-dự-án">Giới thiệu về dự án</a>
      <ul>
        <li><a href="#🎯-mục-tiêu">Mục tiêu</a></li>
        <li><a href="#✨-tính-năng">Tính năng</a></li>
        <li><a href="#💻-công-nghệ-xây-dựng">Công nghệ xây dựng</a></li>
      </ul>
    </li>
    <li>
      <a href="#🛠-bắt-đầu-dự-án">Bắt đầu dự án</a>
      <ul>
        <li><a href="#❗-yêu-cầu-công-nghệ">Yêu cầu công nghệ</a></li>
        <li><a href="#⚙-cài-đặt">Cài đặt</a></li>
      </ul>
    </li>
  </ol>
</details>

## 📝 Giới thiệu về dự án

---

<div align="center" style={display:'flex'}>
     <div >
        <img src="https://designimage.s3.ap-southeast-1.amazonaws.com/layoutHome.png"  alt="Photo"  />
     </div>
  <br />
     <div>
       <img src="https://designimage.s3.ap-southeast-1.amazonaws.com/designScreen.png" alt="Photo" />
     </div>

</div>

<br />

### 🎯 Mục tiêu

Hugo là ứng dụng hỗ trợ thiết kế và quản lý những sản phẩm in ấn. Ứng dụng giúp cho mọi người không cần phải có kiến thức về đồ họa mà vẫn có thể tạo ra được những thiết kế đẹp. Ví dụ: người dùng chỉ cần kéo thả những thành phần mình muốn thêm vào sản phẩm sau đó người dùng tùy chỉnh thành phần đó phù hợp để tạo được sản phẩm đẹp

### ✨ Tính năng



- Đăng ký, đăng nhập, đăng xuất ứng dụng
- chức năng thiết kế 
- Chia sẻ thiết kế
- Chức năng yêu thích sản phẩm
- Chức năng tìm kiếm
- Quản lý kho ảnh: thêm, xem, xóa ảnh
- Quản lý sản phẩm yêu thích: CRUD
- Quản lý sản phẩm thiết kế: CRUD
- Quản lý sản phẩm mẫu: CRUD
- Quản lý và phẩn quyền người dùng


### 💻 Công nghệ xây dựng

- Backend, Database

  - Nodejs, ExpressJS, RESTFul APIs.
  - MongoDB, MongooseJS.
  - JWT (JSON Web Token).
  - websocket


- Frontend
  - Vuejs, VueX, Bootstrap, Tailwindcss Library.
  - Fabric library
  - Axios RESTFul API, query string.
  



---

## 🛠 Bắt đầu dự án

### ❗ Yêu cầu công nghệ

- [MongoDB Server](https://www.mongodb.com/)
- [NodeJS, Npm (Node Package Manager)](https://nodejs.org/en/)
- [Git, Github](https://git-scm.com/)

### ⚙ Cài đặt

1. Clone project này

```
  git clone https://github.com/duongko41200/Design_Print_Project.git
```

2. Cài đặt thư viện ở Backend, Frontend

```
  npm install 
```

3. Thay thế file .local.env thành file .env và cập nhật thông tin.

4. Chạy project

```
  cd server
  npm run start 
```

```
  cd client
  npm run server
```

---

