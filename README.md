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

<div align="center">
  <img src="../client/src/assets/" alt="Photo" />
</div>

<br />

### 🎯 Mục tiêu

Hugo là ứng dụng học tiếng Anh hoàn toàn miễn phí cho người Việt Nam, được phát triển bởi [Dyno Nguyen](https://dynonguyen.com). Với mong muốn cải thiện tiếng Anh bản thân và mọi người nhưng không gây sự nhàm chán trong việc học, tôi đã xây dựng nên ứng dụng này.

Dynonary sẽ tổng hợp từ vựng, ngữ pháp và các bài viết từ nhiều nguồn đáng tin cậy, kết hợp với những tính năng rất hữu dụng của ứng dụng. Điều này sẽ giúp bạn tiết kiệm rất nhiều thời gian trong việc học tiếng Anh của mình.

Dynonary cũng là một `Pet Project` giúp tôi ôn luyện kỹ năng lập trình của mình. Và đây cũng là một dự án `mã nguồn mở`, vì thế rất mong sự đóng góp, phát triển ứng dụng của mọi người.

### ✨ Tính năng

![Main Features](https://res.cloudinary.com/dynonary/image/upload/v1627098768/dynonary/logo/dyno-main.png)

- Đăng ký, đăng nhập, đăng xuất ứng dụng
- chức năng thiết kế 
- Chia sẻ thiết kế
- Chức năng yêu thích sản phẩm
- Chức năng tìm kiếm
- Quản lý kho ảnh: thêm, xem, xóa ảnh
- Quản lý sản phẩm yêu thích: CRUD
- Quản lý sản phẩm thiết kế: CRUD
- quản lý sản phẩm mẫu: CRUD
- Quản lý và phẩn quyền người dùng

## Hình ảnh mô tả 1 số chức năng chính:
- Chức năng thiết kế


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

