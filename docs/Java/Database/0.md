# Java 操作数据库相关概念

## JDBC

JDBC(Java DataBase Connectivity)，是 Java 连接数据库操作的原生接口。
JDBC 对于 Java 程序员而言是 API，为数据库访问提供标准的接口。由各个数据库厂商及第三方中间件厂商依照 JDBC 规范为数据库的连接提供的标准方法。
可以理解为，各个产商的 DB 产品很多，Java 联合各个 DB 的产商定了一个规范。Java 可以按照规范去编写代码，就可以用相同的操作方法去操作不同产商的 DB。也就是说 JDBC 是 Java 与各个 DB 产商之间的一个约定规范，约束的是 DB 产商的实现规范。

<img src="https://raw.githubusercontent.com/FanfanY/image-cloud/main/assets202307150911171.png" alt="image-20230715091111301" style="zoom: 50%;" />

基于 JDBC，在 Java 代码中执行 DB 操作，代码示意如下：

```java
public class JdbcTest {
  public static void main(String[] args) throws Exception {
    // 1.加载驱动
    Class.forName("com.mysql.cj.jdbc.Driver");
    // 2.创建和数据库之间的连接
    String username = "testdb";
    String password = "testxxxxx";
    String url = "jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8&userSSL=false...";
    Connection conn = DriverManager.getConnection(url, username, password);
    // 3. 准备发送SQL
    String sql = "select * from t_person";
    PreparedStatement pstm = conn.prepareStatement(sql);
    // 4. 执行SQL，接收结果集
    ResultSet rs = pstm.executeQuery();
    // 5. 处理结果集
    while(rs.next()) {
      int personId1 = rs.getInt("person_id");
      String personName1 = rs.getString("person_name");
      int age = rs.getInt("age");
      System.out.println("person" + personId1);
    }
    // 6. 释放资源
    rs.close();
    pstm.close();
    conn.close();
  }
}
```

从上面的代码可以看出，直接基于 JDBC 进行操作 DB，弊端比较明显：

1. 业务代码里面耦合了字符串格式 SQL 语句，复杂场景维护起来比较麻烦；
2. 非结构化的 key-value 映射方式处理结果，操作过于复杂，不符合 Java 面相对象的思想；
3. 需要关注过程资源的释放，操作不当容易造成泄露。

## ORM 框架

对象-关系映射（Object-Relational Mapping，简称 ORM）。ORM 框架贯穿 Java 面向对象编程的思想。

ORM 就是把代码中 Java 类与 DB 中的 table 映射，是一种解决面向对象与关系型数据库中数据类型不匹配的技术。代码中对相关 Java 类的操作，即体现为 DB 对相关 Table 的操作。ORM 实际上是一种概念。主流的 Java ORM 框架有 Hibernate 和 MyBatis。

## JPA

JPA 全称 Java Persistence API，Java 持久层应用接口。JPA 本身不是框架，本质是一种 ORM 规范。Hibernate 是一个框架，是 JPA 的一种实现。

Java 持久层访问数据库的方式大致分为两种，一种是以 SQL 为核心，封装一定程度的 JDBC 操作，比如 MyBatis。另一种以 Java 实体类为核心，将实体类和数据库表之间建立映射关系，如 Hibernate，Spring Data JPA。

JPA 提供了哪些规范？

- ORM 映射元数据：JPA 支持 XML 和注解两种元数据的形式。元数据描述对象和表之间的映射关系，框架根据这个将实体对象持久化到数据库表中。

- JPA 的 API：用来操作实体对象，执行 CRUD 操作，框架在后台为我们完成所有事情，比如转为 SQL 执行。

- JPQL 查询语言：通过面向对象而非面向数据库的查询语言查询数据，避免程序的 SQL 语句紧密耦合。

  <img src="https://raw.githubusercontent.com/FanfanY/image-cloud/main/assets202307150951620.png" alt="image-20230715095104586" style="zoom:50%;" />

## Spring Data JPA

Spring Data JPA 是 Spring 提供的一套简化 JPA 开发的框架，按照约定好的方法命名规则写 DAO 层接口，就可以在不写接口实现的情况下，实现对数据库的访问和操作，同时提供了很多除了 CRUD 之外的功能，比如分页、排序、复杂查询等等。

需要注意的是，Spring Data JPA 不是一个完整的 JPA 规范的实现，只是一个代码抽象层，主要用于减少各种持久层存储实现数据访问层所需的代码量。其底层仍是 Hibernate。

举个例子来理解 Spring Data JPA 带来的便利

有一张用户表(UserEntity)，

| ID  | UserName | Department | Role   |
| --- | -------- | ---------- | ------ |
| 1   | Jack     | DevDept    | Normal |
| 2   | Tom      | DevDept    | Admin  |
| 3   | Tony     | SaleDept   | Normal |

代码中：

```Java
// 1. 获取所有研发部门的人员
List<UserEntity> users = userRepository.findAllByDepartment("DevDept");
// 2. 获取研发部门的管理员
List<UserEntity> users = userRepository.findAllByDepartmentAndRole("DevDept", "Admin");
```
