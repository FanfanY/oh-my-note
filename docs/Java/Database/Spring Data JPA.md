# Spring Data JPA 用法

## Repository

### 使用

先看一个 Repository 的例子

Repository 需要继承 JpaRepository，并且需要传入两个泛型：

- Entity 对象，也就是这个 Repository 需要操作的具体对象
- 主键数据类型，也就是 Entity 类中以@Id 注解标识的字段类型。如果主键是复合主键，则可以使用`@EmbeddedId`

```java
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  // department是使用了@ManyToOne，级联查询
  List<UserEntity> findAllByDepartment(Department department);
  UserEntity findFirstByWorkId(String workId);
}
```

<img src="https://raw.githubusercontent.com/FanfanY/image-cloud/main/assets202307151613390.png" alt="image-20230715161316304" style="zoom:50%;" />

### @EmbeddedId 使用

```java
@Embeddable
public class TranslationId {
  @Column(name = "id")
  String id;

  @Column(name = "language_code")
  String languageCode;
}

@Data
@Entity
@Table(name = "translation")
public class Translation {
  @EmbeddedId TranslationId id;

  @Column(name = "description")
  String description;
}
```

### Example 使用

通常情况下，简单查询就可以满足我们的需求，查询条件是固定的一个或多个字段，这种情况在 repository 中根据命名规范定义一个接口即可。

当遇到不固定的场景，比如需要做一个用户搜索的能力，能够支持根据用户名、工号、部门、姓名、年龄、职务等等若干个字段中的一个或多个组合来查询符合条件的用户信息。也就是说，每次查询的条件不固定，可能使用用户名查询，也可能使用部门和职务查询。这个时候，我们可以使用 `Example`。

```java
public List<UserEntity> queryUsers(UserEntity user) {
  Example<UserEntity> example = Example.of(user);
  return userRepository.findAll(example);
}
```

### EntityListener 使用

需求：监听某个数据的变更，然后做一些相应的处理逻辑。
JPA 自定义的 EntityListener 功能提供了这样的功能。

```java
//定义Listener类
public class CommentCountAuditListener {
  /**
   * 当comment表中有新增数据操作时，触发此方法
   */
  @PostPersist
  public void postPersist(CommentEntity entity) {
    // do something here ...
  }

  /**
   * 当comment表中有删除数据的操作时，触发此方法
   */
  @PostRemove
  public void postRemove(CommentEntity entity) {
    // do something here ...
  }

  /**
   * 当comment表中有更新数据的操作时，触发此方法
   */
  @PostUpdate
  public void postUpdate(CommentEntity entity) {
    // do something here ...
  }
}

//在要监听的表上加上Listener的信息
@Entity
@Table("comment")
@EntityListeners({CommentCountAuditListener.class})
public class CommentEntity {

}
```

### 定义化 SQL

JPA 提供`@Query`注解，可以实现自定义 SQL 语句的能力

```java
@Query(value = "select * from user " +
      	"where work_id in (?1) " +
      	"and department_id = 0 " +
      	"order by CREATE_TIME desc ",
      	nativeQuery = true)
List<OssFileInfoEntity> queryUsersByWorkIdIn(List<String> workIds);
```

执行写操作需要再 query 上加上`@Modifying`注解。

`nativeQuery = true`表示`@Query`注解中提供的 value 值为原生 SQL 语句。如果是 false，则表示将使用 JPQL 语言来执行。
JPQL，是 Java 持久化查询语句，是一种类似 SQL 的语法，不同点是它可以使用类名来替换表明，使用类字段来替代表字段名。

```java
@Query("select u from com.demo.UserInfo u where u.userName = ?1")
public UserInfo getUserInfoByName(String name);
```

当使用`nativeQuery=false`查询时，支持在接口里传 Sort 对象和 PageRequest 对象进行混合执行，完成排序、分页等操作。

另外，可以使用`@Param`注解来绑定参数名，这样 API 接口传参顺序就不会影响查询语句里的参数顺序。
