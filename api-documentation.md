# **API documentation**
REST API documentation for **SpeakUp**: An anonymous confession platform for students of Lumbini ICT Campus.

- [**API documentation**](#api-documentation)
  - [**Auth**](#auth)
    - [**Register**](#register)
      - [Method | **POST**](#method--post)
      - [Body](#body)
    - [**Login**](#login)
      - [Method | **POST**](#method--post-1)
      - [Body](#body-1)
    - [**Get access token**](#get-access-token)
      - [Method | **GET**](#method--get)
    - [**Get user by id**](#get-user-by-id)
      - [Method | **GET**](#method--get-1)
    - [**Get logged in user**](#get-logged-in-user)
      - [Method | **GET**](#method--get-2)
    - [**Delete user**](#delete-user)
      - [Method | **DELETE**](#method--delete)
    - [**Change password**](#change-password)
      - [Method | **PUT**](#method--put)
      - [Body](#body-2)
  - [**Comment Routes**](#comment-routes)
    - [**Create comment**](#create-comment)
      - [Method | **POST**](#method--post-2)
      - [Body](#body-3)
    - [**Get comment by id**](#get-comment-by-id)
      - [Method | **POST**](#method--post-3)
    - [**Update comment**](#update-comment)
      - [Method | **PUT**](#method--put-1)
      - [Body](#body-4)
    - [**Delete comment**](#delete-comment)
      - [Method | **DELETE**](#method--delete-1)
  - [**Comment Vote Routes**](#comment-vote-routes)
    - [**Create comment upvote**](#create-comment-upvote)
      - [Method | **POST**](#method--post-4)
    - [**Create comment downvote**](#create-comment-downvote)
      - [Method | **POST**](#method--post-5)
    - [**Update up vote**](#update-up-vote)
      - [Method | **PUT**](#method--put-2)
    - [**Update down vote**](#update-down-vote)
      - [Method | **PUT**](#method--put-3)
    - [**Delete up vote**](#delete-up-vote)
      - [Method | **DELETE**](#method--delete-2)
    - [**Delete down vote**](#delete-down-vote)
      - [Method | **DELETE**](#method--delete-3)
  - [**Confession Routes**](#confession-routes)
    - [**Get all confessions**](#get-all-confessions)
      - [Method | **GET**](#method--get-3)
    - [**Create confession**](#create-confession)
      - [Method | **POST**](#method--post-6)
      - [Body](#body-5)
    - [**Get confession by id**](#get-confession-by-id)
      - [Method | **GET**](#method--get-4)
    - [**Update confession**](#update-confession)
      - [Method | **PUT**](#method--put-4)
      - [Body](#body-6)
    - [**Delete confession**](#delete-confession)
      - [Method | **DELETE**](#method--delete-4)
    - [**Approve confession**](#approve-confession)
      - [Method | **PUT**](#method--put-5)
    - [**Get pending confessions**](#get-pending-confessions)
      - [Method | **GET**](#method--get-5)
  - [**Confession Tag Routes**](#confession-tag-routes)
    - [**Create confession tag**](#create-confession-tag)
      - [Method | **POST**](#method--post-7)
    - [**Get confession tag by id**](#get-confession-tag-by-id)
      - [Method | **GET**](#method--get-6)
    - [**Delete confession tag**](#delete-confession-tag)
      - [Method | **DELETE**](#method--delete-5)
    - [**Get confession related to tags**](#get-confession-related-to-tags)
      - [Method | **GET**](#method--get-7)
  - [**Confession Vote Routes**](#confession-vote-routes)
    - [**Confession up vote**](#confession-up-vote)
      - [Method | **POST**](#method--post-8)
    - [**Confession down vote**](#confession-down-vote)
      - [Method | **POST**](#method--post-9)
    - [**Update confession up vote**](#update-confession-up-vote)
      - [Method | **PUT**](#method--put-6)
    - [**Update confession down vote**](#update-confession-down-vote)
      - [Method | **PUT**](#method--put-7)
    - [**Delete confession up vote**](#delete-confession-up-vote)
      - [Method | **DELETE**](#method--delete-6)
    - [**Delete confession down vote**](#delete-confession-down-vote)
      - [Method | **DELETE**](#method--delete-7)
  - [**Notification Routes**](#notification-routes)
    - [**Create notification**](#create-notification)
      - [Method | **POST**](#method--post-10)
      - [Body](#body-7)
    - [**Get notification by user id**](#get-notification-by-user-id)
      - [Method | **GET**](#method--get-8)
    - [**Get notification by id**](#get-notification-by-id)
      - [Method | **GET**](#method--get-9)
    - [**Update notification status**](#update-notification-status)
    - [**Delete notification**](#delete-notification)
      - [Method | **DELETE**](#method--delete-8)
  - [**Reporting Routes**](#reporting-routes)
    - [**Create reporting**](#create-reporting)
      - [Method | **POST**](#method--post-11)
      - [Body](#body-8)
    - [**Get all reportings**](#get-all-reportings)
      - [Method | **GET**](#method--get-10)
    - [**Get report by id**](#get-report-by-id)
      - [Method | **GET**](#method--get-11)
    - [**Delete reporting by id**](#delete-reporting-by-id)
      - [Method | **DELETE**](#method--delete-9)
    - [**Update reporting by id**](#update-reporting-by-id)
    - [**Get reporting by user**](#get-reporting-by-user)
      - [Method | **GET**](#method--get-12)
    - [**Get reporting by object type**](#get-reporting-by-object-type)
      - [Method | **GET**](#method--get-13)
    - [**Get reporting by resolved status**](#get-reporting-by-resolved-status)
      - [Method | **GET**](#method--get-14)
  - [**Tag Routes**](#tag-routes)
    - [**Get all tag**](#get-all-tag)
      - [Method | **GET**](#method--get-15)
    - [**Create tag**](#create-tag)
      - [Method | **POST**](#method--post-12)
      - [Body](#body-9)
    - [**Get tag with id**](#get-tag-with-id)
      - [Method | **GET**](#method--get-16)
    - [**Update tag**](#update-tag)
      - [Method | **PUT**](#method--put-8)
      - [Body](#body-10)
    - [**Delete tag**](#delete-tag)
      - [Method | **DELETE**](#method--delete-10)
  - [**View Routes**](#view-routes)
    - [**Create view**](#create-view)
      - [Method | **POST**](#method--post-13)
    - [**Get view by confession id**](#get-view-by-confession-id)
      - [Method | **GET**](#method--get-17)
    - [**Get total view count by confession**](#get-total-view-count-by-confession)
      - [Method | **GET**](#method--get-18)
    - [**Get all views by user id**](#get-all-views-by-user-id)
      - [Method | **GET**](#method--get-19)
    - [**Delete view by id**](#delete-view-by-id)
      - [Method | **DELETE**](#method--delete-11)

## **Auth**
### **Register**
#### Method | **POST**
`{{url}}/auth/register`
#### Body
```json
{
    "handle": "itsankitbhusal",
    "password": "admin",
    "email": "ankitbhusal@gmail.com"
}
```

### **Login**
#### Method | **POST**
`{{url}}/auth/login`
#### Body
```json
{
    "handle": "itsankitbhusal",
    "password": "admin"
}
```
### **Get access token**
#### Method | **GET**
required refresh token in **header** named `refresh`
`{{url}}/auth/token`
### **Get user by id**
#### Method | **GET**
`{{url}}/auth/user/:id`

### **Get logged in user**
#### Method | **GET**
`{{url}}/auth/user/me`

### **Delete user**
#### Method | **DELETE**
`{{url}}/auth/user/:id`

### **Change password**
#### Method | **PUT**
`{{url}}/auth/user/reset`
#### Body
```json
{
    "oldPassword": "abc",
    "newPassword": "admin"
}
```
## **Comment Routes**
### **Create comment**
#### Method | **POST**
`{{url}}/comment/:id`
#### Body
```json
{
    "body": "good",
}
```
### **Get comment by id**
#### Method | **POST**
`{{url}}/comment/:id`

### **Update comment**
#### Method | **PUT**
`{{url}}/comment/:id`
#### Body
```json
{
    "body": "its working"
}
```
### **Delete comment**
#### Method | **DELETE**
`{{url}}/comment/:id`
## **Comment Vote Routes**
### **Create comment upvote**
#### Method | **POST**
`{{url}}/comment-vote/up/:id`
### **Create comment downvote**
#### Method | **POST**
`{{url}}/comment-vote/down/:id`
### **Update up vote**
#### Method | **PUT**
`{{url}}/comment-vote/up/:id`

### **Update down vote**
#### Method | **PUT**
`{{url}}/comment-vote/down/:id`

### **Delete up vote**
#### Method | **DELETE**
`{{url}}/comment-vote/up/:id`

### **Delete down vote**
#### Method | **DELETE**
`{{url}}/comment-vote/down/:id`

## **Confession Routes**
### **Get all confessions**
#### Method | **GET**
`{{url}}/confession`

### **Create confession**
#### Method | **POST**
`{{url}}/confession`
#### Body
```json
{
    "title": "title here >= 150 characters",
    "body": "body here >=1000 characters"
}
```
### **Get confession by id**
#### Method | **GET**
`{{url}}/confession/:id`

### **Update confession**
#### Method | **PUT**
`{{url}}/confession/:id`
#### Body
```json
{
    "title": "title here >= 150 characters",
    "body": "body here >=1000 characters"
}
```
### **Delete confession**
#### Method | **DELETE**
`{{url}}/confession/:id`

### **Approve confession**
#### Method | **PUT**
is_approved - `boolean`
`{{url}}/confession/approve/:id`

### **Get pending confessions**
#### Method | **GET**
`{{url}}/confession/pending`
## **Confession Tag Routes**
### **Create confession tag**
#### Method | **POST**
`{{url}}/confession-tag/:confessionId/:tagId`
### **Get confession tag by id**
#### Method | **GET**
`{{url}}/confession-tag/:id`

### **Delete confession tag**
#### Method | **DELETE**
`{{url}}/confession-tag/:confessionId/:tagId`

### **Get confession related to tags**
#### Method | **GET**
`{{url}}/confession-tag/tag/:tagId`
## **Confession Vote Routes**
### **Confession up vote**
#### Method | **POST**
`{{url}}/confession-vote/up/:confessionId`
### **Confession down vote**
#### Method | **POST**
`{{url}}/confession-vote/down/:confessionId`
### **Update confession up vote**
#### Method | **PUT**
`{{url}}/confession-vote/up/:confessionId`

### **Update confession down vote**
#### Method | **PUT**
`{{url}}/confession-vote/down/:confessionId`

### **Delete confession up vote**
#### Method | **DELETE**
`{{url}}/confession-vote/up/:confessionId`

### **Delete confession down vote**
#### Method | **DELETE**
`{{url}}/confession-vote/down/:confessionId`

## **Notification Routes**
### **Create notification**
#### Method | **POST**
`{{url}}/notification`
#### Body
```json
{
    "notificationMessage": "message here >= 150 characters",
    "userId": "2"
}
```
### **Get notification by user id**
#### Method | **GET**
`{{url}}/notification/user/:userId`

### **Get notification by id**
#### Method | **GET**
`{{url}}/notification/:id`

### **Update notification status**
`is_viewed` - boolean
`{{url}}/notification/:id` 

### **Delete notification**
#### Method | **DELETE**
`{{url}}/notification/:id`
## **Reporting Routes**
### **Create reporting**
#### Method | **POST**
`{{url}}/reporting`
#### Body
```json
{
    "reportType": "comment || confession",
    "commentId": "4",
    "description": "test comment report"
}
```

### **Get all reportings**
#### Method | **GET**
`{{url}}/reporting`

### **Get report by id**
#### Method | **GET**
`{{url}}/reporting/:id`

### **Delete reporting by id**
#### Method | **DELETE**
`{{url}}/reporting/:id`

### **Update reporting by id**
`is_resolved` - boolean
`{{url}}/reporting/:id`

### **Get reporting by user**
#### Method | **GET**
`{{url}}/reporting/user/:userId`

### **Get reporting by object type**
#### Method | **GET**
objectType: `comment` || `confession`
`{{url}}/reporting/object/:objectType`

### **Get reporting by resolved status**
#### Method | **GET**
is_resolved: `boolean`
`{{url}}/reporting/resolved/:isResolved`
## **Tag Routes**
### **Get all tag**
#### Method | **GET**
`{{url}}/tag`

### **Create tag**
#### Method | **POST**
`{{url}}/tag`
#### Body
```json
{
    "name": "tag name"
}
```
### **Get tag with id**
#### Method | **GET**
`{{url}}/tag/:id`

### **Update tag**
#### Method | **PUT**
`{{url}}/tag/:id`
#### Body
```json
{
    "name": "tag name"
}
```
### **Delete tag**
#### Method | **DELETE**
`{{url}}/tag/:id`

## **View Routes**
### **Create view**
#### Method | **POST**
`{{url}}/view/:confessionId`

### **Get view by confession id**
#### Method | **GET**
`{{url}}/view/:confessionId`

### **Get total view count by confession**
#### Method | **GET**
`{{url}}/view/count/:confessionId`

### **Get all views by user id**
#### Method | **GET**
`{{url}}/view/user/:userId`

### **Delete view by id**
#### Method | **DELETE**
`{{url}}/view/:id`