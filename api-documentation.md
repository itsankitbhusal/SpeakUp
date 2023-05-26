# **API documentation**
REST API documentation for **SpeakUp**: An anonymous confession platform for students of Lumbini ICT Campus.

- [**API documentation**](#api-documentation)
  - [**Auth Routes**](#auth-routes)
    - [**Register**](#register)
    - [**Login**](#login)
    - [**Get access token**](#get-access-token)
    - [**Get user by id**](#get-user-by-id)
    - [**Get logged in user**](#get-logged-in-user)
    - [**Delete user**](#delete-user)
    - [**Change password**](#change-password)
  - [**Comment Routes**](#comment-routes)
    - [**Create comment**](#create-comment)
    - [**Get comment by id**](#get-comment-by-id)
    - [**Update comment**](#update-comment)
    - [**Delete comment**](#delete-comment)
  - [**Comment Votes Routes**](#comment-votes-routes)
    - [**Create comment upvote**](#create-comment-upvote)
    - [**Create comment downvote**](#create-comment-downvote)
    - [**Update up vote**](#update-up-vote)
    - [**Update down vote**](#update-down-vote)
    - [**Delete up vote**](#delete-up-vote)
    - [**Delete down vote**](#delete-down-vote)
  - [**Confession Routes**](#confession-routes)
    - [**Get all confessions**](#get-all-confessions)
    - [**Create confession**](#create-confession)
    - [**Get confession by id**](#get-confession-by-id)
    - [**Update confession**](#update-confession)
    - [**Delete confession**](#delete-confession)
    - [**Approve confession**](#approve-confession)
    - [**Get pending confessions**](#get-pending-confessions)
  - [**Confession Tag Routes**](#confession-tag-routes)
    - [**Create confession tag**](#create-confession-tag)
    - [**Get confession tag by id**](#get-confession-tag-by-id)
    - [**Delete confession tag**](#delete-confession-tag)
    - [**Get confession related to tags**](#get-confession-related-to-tags)
  - [**Confession Vote Routes**](#confession-vote-routes)
    - [**Confession up vote**](#confession-up-vote)
    - [**Confession down vote**](#confession-down-vote)
    - [**Update confession up vote**](#update-confession-up-vote)
    - [**Update confession down vote**](#update-confession-down-vote)
    - [**Delete confession up vote**](#delete-confession-up-vote)
    - [**Delete confession down vote**](#delete-confession-down-vote)
  - [**Notification Routes**](#notification-routes)
    - [**Create notification**](#create-notification)
    - [**Get notification by user id**](#get-notification-by-user-id)
    - [**Get notification by id**](#get-notification-by-id)
    - [**Update notification status**](#update-notification-status)
    - [**Delete notification**](#delete-notification)
  - [**Reporting Routes**](#reporting-routes)
    - [**Create reporting**](#create-reporting)
    - [**Get all reportings**](#get-all-reportings)
    - [**Get report by id**](#get-report-by-id)
    - [**Delete reporting by id**](#delete-reporting-by-id)
    - [**Update reporting by id**](#update-reporting-by-id)
    - [**Get reporting by user**](#get-reporting-by-user)
    - [**Get reporting by object type**](#get-reporting-by-object-type)
    - [**Get reporting by resolved status**](#get-reporting-by-resolved-status)
  - [**Tag Routes**](#tag-routes)
    - [**Get all tag**](#get-all-tag)
    - [**Create tag**](#create-tag)
    - [**Get tag with id**](#get-tag-with-id)
    - [**Update tag**](#update-tag)
    - [**Delete tag**](#delete-tag)
  - [**View Routes**](#view-routes)
    - [**Create view**](#create-view)
    - [**Get view by confession id**](#get-view-by-confession-id)
    - [**Get total view count by confession**](#get-total-view-count-by-confession)
    - [**Get all views by user id**](#get-all-views-by-user-id)
    - [**Delete view by id**](#delete-view-by-id)

---
## <a id="auth"></a>**Auth Routes**
### **Register**
 Method | **POST**
`{{url}}/auth/register`
 Body
```json
{
    "handle": "itsankitbhusal",
    "password": "admin",
    "email": "ankitbhusal@gmail.com"
}
```

### **Login**
 Method | **POST**
`{{url}}/auth/login`
 Body
```json
{
    "handle": "itsankitbhusal",
    "password": "admin"
}
```
### **Get access token**
 Method | **GET**
required refresh token in **header** named `refresh`
`{{url}}/auth/token`
### **Get user by id**
 Method | **GET**
`{{url}}/auth/user/:id`

### **Get logged in user**
 Method | **GET**
`{{url}}/auth/user/me`

### **Delete user**
 Method | **DELETE**
`{{url}}/auth/user/:id`

### **Change password**
 Method | **PUT**
`{{url}}/auth/user/reset`
 Body
```json
{
    "oldPassword": "abc",
    "newPassword": "admin"
}
```
---

## <a id="comment-routes"></a>**Comment Routes**
### **Create comment**
 Method | **POST**
`{{url}}/comment/:id`
 Body
```json
{
    "body": "good",
}
```
### **Get comment by id**
 Method | **POST**
`{{url}}/comment/:id`

### **Update comment**
 Method | **PUT**
`{{url}}/comment/:id`
 Body
```json
{
    "body": "its working"
}
```
### **Delete comment**
 Method | **DELETE**
`{{url}}/comment/:id`

---

## <a id="comment-vote-routes"></a>**Comment Votes Routes**
### **Create comment upvote**
 Method | **POST**
`{{url}}/comment-vote/up/:id`
### **Create comment downvote**
 Method | **POST**
`{{url}}/comment-vote/down/:id`
### **Update up vote**
 Method | **PUT**
`{{url}}/comment-vote/up/:id`

### **Update down vote**
 Method | **PUT**
`{{url}}/comment-vote/down/:id`

### **Delete up vote**
 Method | **DELETE**
`{{url}}/comment-vote/up/:id`

### **Delete down vote**
 Method | **DELETE**
`{{url}}/comment-vote/down/:id`

---

## <a id="confession-routes"></a>**Confession Routes**
### **Get all confessions**
 Method | **GET**
`{{url}}/confession`

### **Create confession**
 Method | **POST**
`{{url}}/confession`
 Body
```json
{
    "title": "title here >= 150 characters",
    "body": "body here >=1000 characters"
}
```
### **Get confession by id**
 Method | **GET**
`{{url}}/confession/:id`

### **Update confession**
 Method | **PUT**
`{{url}}/confession/:id`
 Body
```json
{
    "title": "title here >= 150 characters",
    "body": "body here >=1000 characters"
}
```
### **Delete confession**
 Method | **DELETE**
`{{url}}/confession/:id`

### **Approve confession**
 Method | **PUT**
is_approved - `boolean`
`{{url}}/confession/approve/:id`

### **Get pending confessions**
 Method | **GET**
`{{url}}/confession/pending`

---

## <a id="confession-tag-routes"></a>**Confession Tag Routes**
### **Create confession tag**
 Method | **POST**
`{{url}}/confession-tag/:confessionId/:tagId`
### **Get confession tag by id**
 Method | **GET**
`{{url}}/confession-tag/:id`

### **Delete confession tag**
 Method | **DELETE**
`{{url}}/confession-tag/:confessionId/:tagId`

### **Get confession related to tags**
 Method | **GET**
`{{url}}/confession-tag/tag/:tagId`

---

## <a id="confession-vote-routes"></a>**Confession Vote Routes**
### **Confession up vote**
 Method | **POST**
`{{url}}/confession-vote/up/:confessionId`
### **Confession down vote**
 Method | **POST**
`{{url}}/confession-vote/down/:confessionId`
### **Update confession up vote**
 Method | **PUT**
`{{url}}/confession-vote/up/:confessionId`

### **Update confession down vote**
 Method | **PUT**
`{{url}}/confession-vote/down/:confessionId`

### **Delete confession up vote**
 Method | **DELETE**
`{{url}}/confession-vote/up/:confessionId`

### **Delete confession down vote**
 Method | **DELETE**
`{{url}}/confession-vote/down/:confessionId`

---

## <a id="notification-routes"></a>**Notification Routes**
### **Create notification**
 Method | **POST**
`{{url}}/notification`
 Body
```json
{
    "notificationMessage": "message here >= 150 characters",
    "userId": "2"
}
```
### **Get notification by user id**
 Method | **GET**
`{{url}}/notification/user/:userId`

### **Get notification by id**
 Method | **GET**
`{{url}}/notification/:id`

### **Update notification status**
`is_viewed` - boolean
`{{url}}/notification/:id` 

### **Delete notification**
 Method | **DELETE**
`{{url}}/notification/:id`

---

## <a id="reporting-routes"></a>**Reporting Routes**

### **Create reporting**
 Method | **POST**
`{{url}}/reporting`
 Body
```json
{
    "reportType": "comment || confession",
    "commentId": "4",
    "description": "test comment report"
}
```

### **Get all reportings**
 Method | **GET**
`{{url}}/reporting`

### **Get report by id**
 Method | **GET**
`{{url}}/reporting/:id`

### **Delete reporting by id**
 Method | **DELETE**
`{{url}}/reporting/:id`

### **Update reporting by id**
`is_resolved` - boolean
`{{url}}/reporting/:id`

### **Get reporting by user**
 Method | **GET**
`{{url}}/reporting/user/:userId`

### **Get reporting by object type**
 Method | **GET**
objectType: `comment` || `confession`
`{{url}}/reporting/object/:objectType`

### **Get reporting by resolved status**
 Method | **GET**
is_resolved: `boolean`
`{{url}}/reporting/resolved/:isResolved`

---

## <a id="tag-routes"></a>**Tag Routes**
### **Get all tag**
 Method | **GET**
`{{url}}/tag`

### **Create tag**
 Method | **POST**
`{{url}}/tag`
 Body
```json
{
    "name": "tag name"
}
```
### **Get tag with id**
 Method | **GET**
`{{url}}/tag/:id`

### **Update tag**
 Method | **PUT**
`{{url}}/tag/:id`
 Body
```json
{
    "name": "tag name"
}
```
### **Delete tag**
 Method | **DELETE**
`{{url}}/tag/:id`

---

## <a id="view-routes"></a>**View Routes**
### **Create view**
 Method | **POST**
`{{url}}/view/:confessionId`

### **Get view by confession id**
 Method | **GET**
`{{url}}/view/:confessionId`

### **Get total view count by confession**
 Method | **GET**
`{{url}}/view/count/:confessionId`

### **Get all views by user id**
 Method | **GET**
`{{url}}/view/user/:userId`

### **Delete view by id**
 Method | **DELETE**
`{{url}}/view/:id`