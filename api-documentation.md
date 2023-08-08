# API Documentation of SpeakUp

## Auth

This section contains API requests related to user authentication and management.

### Register User

```json
POST /auth/register 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "user": {
      "id": 263,
      "handle": "ankitbhusal200"
    },
    "refreshToken": "...",
    "accessToken": "..."
  }  
}
```

Register a new user account.

### Login 

```json
POST /auth/login
```

```json 
// Sample Response
{
  "success": true,
  "data": {
    "user": {
      "id": 239,
      "handle": "itsankitbhusal"
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

Login with existing username and password.

### Get New Access Token

```json
GET /auth/token
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "accessToken": "..."
  }
}
```

Get a new access token using refresh token.

### Get All Users

```json  
GET /auth/users
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 91,
      "handle": "Iva_Funk51",
      "role": "user" 
    },
    {
      "id": 150, 
      "handle": "Janelle.Moore",
      "role": "user"
    }
  ]
}
```

Get details of all users.

### Get User By Handle

```json
GET /auth/user/{handle} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 239,
    "handle": "itsankitbhusal",
    "role": "admin"
  }
}
```

Get user details by handle.

### Get Logged In User  

```json
GET /auth/me
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 38,
    "handle": "itsankitbhusal",
    "role": "admin"
  }
}
```

Get details of logged in user.

### Delete User

```json  
DELETE /auth/user/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": 1 
}
```

Delete user by id.

### Change Password

```json
PUT /auth/user/reset
```

```json
// Sample Response
{
  "success": true,
  "data": "Email sent" 
}
```

Change password of logged in user.

### Get details of logged in user | for profile

```json
GET /auth/me
```

```json
// Same as Get Logged In User response  
```

Get details of logged in user for profile.

### Upgrade user to admin  

```json
PUT /auth/{id}/admin
```

```json 
// Sample Response
{
  "success": true,
  "data": [1]
}
```

Upgrade normal user to admin. 

### Reset password link after verification

```json 
POST /auth/reset
```

```json
// Sample Response
{
  "success": true,
  "data": "Email sent"
}
```

Send reset password link after email verification.

### Reset user password

```json
GET /auth/reset/{token}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "user": {
      "id": 251,
      "handle": "manay"  
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

Reset user password using token.

## Comment

This section contains API requests related to comments.

### Create Comment

```json  
POST /comment/{confessionId}
```  

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 11130,
    "body": "comment",
    "user_id": 239
  }
}
```

Create a comment on a confession.

### Get Comment By Id

```json
GET /comment/{id}  
```

```json 
// Sample Response
{
  "success": true,
  "data": {
    "id": 4,
    "body": "Comment body...",
    "user": {
      "handle": "username" 
    }
  }
}
```

Get a comment by id.

### Update Comment

```json
PUT /comment/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": [1] 
}
```

Update comment body.

### Delete Comment

```json
DELETE /comment/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": 1
}
```

Delete a comment.

### Get Comments With Confession Id | Pagination

```json  
GET /comment/confession/{id}?page={page}&size={size}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "count": 5,
    "rows": [
      {
        "id": 10301,
        "body": "Comment body...",
        "user": {
           "handle": "username"
        }
      },
      {
        "id": 4820,
        "body": "Comment body...",
         "user": {
           "handle": "username"  
         }
      }
    ]
  }
}
```

Get comments for a confession with pagination.

## CommentVote

This section contains API requests related to commenting voting.

### Create Comment Up Vote  

```json
POST /comment-vote/up/{commentId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Comment vote created successfully." 
}
```

Upvote a comment.

### Create Comment Down Vote

```json
POST /comment-vote/down/{commentId} 
```

```json
// Sample Response 
{
  "success": true,
  "data": "Comment vote created successfully."
}
```

Downvote a comment.

### Update Down-> Up Vote  

```json  
PUT /comment-vote/up/{commentId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Comment vote updated successfully."
}
```

Update downvote to upvote for a comment.

### Update Up -> Down Vote

```json
PUT /comment-vote/down/{commentId} 
```

```json
// Sample Response
{
  "success": true,
  "data": "Comment vote updated successfully."
} 
```

Update upvote to downvote for a comment.

### Delete Up Vote  

```json
DELETE /comment-vote/up/{commentId} 
```

```json
// Sample Response 
{
  "success": false,
  "message": "You cannot perform this action.",
  "status": 400
}
```

Delete upvote on a comment.

### Delete Down Vote

```json
DELETE /comment-vote/down/{commentId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Comment vote deleted successfully."
}
```

Delete downvote on a comment.

### Get Comment Vote Count  

```json  
GET /comment-vote/count/{commentId}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "result": {
      "upvoteCount": 2,
      "downvoteCount": 1,
      "totalVoteCount": 1
    }
  }
}
```

Get upvote and downvote count for a comment.

### Get Comment Vote By User Id For Comment

```json
GET /comment-vote/comment/{commentId}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 21020,
    "user_id": 239,
    "comment_id": 11131,
    "vote_type": "up",
    "user": {
      "handle": "itsankitbhusal"
    }
  }
}
```

Get comment vote by logged in user for a comment.

## Confession  

This section contains API requests related to confessions.

### Get All Confessions

```json 
GET /confession/?limit={limit}&page={page}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confessions": [
      {
        "id": 1332,
        "title": "Confession Title",
        "user": {
          "handle": "username"
        }
      },
      {
        "id": 72,
        "title": "Confession Title",
        "user": {
          "handle": "username"
        }
     }
    ],
    "page": 0,
    "limit": 10 
  }
}
```

Get all confessions with pagination.

### Create Confession

```json
POST /confession
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 1333,
    "title": "Confession Title",
    "body": "Confession body...",
    "user_id": 239
  }
} 
```

Create a new confession.

### Get Confession By Id

```json
GET /confession/{id}
```  

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Confession Title", 
    "body": "Confession body...",
    "user": {
      "handle": "username" 
    }
  }
}
```

Get a confession by id.

### Update Confession  

```json
PUT /confession/{id}
```

```json 
// Sample Response
{
  "success": true,
  "data": [1]
}
```

Update confession title and body.

### Delete Confession

```json  
DELETE /confession/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": 1
}
```

Delete a confession.

### Approve

```json 
PUT /confession/{id}/approve
```

```json
// Sample Response
{
  "success": true,
  "data": [1] 
}
```

Approve a pending confession.

### Pending Confessions  

```json
GET /confession/pending
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confessions": [
      {
        "id": 8,
        "title": "Pending Confession",
        "user": {
          "handle": "username" 
        }
      }
    ]
  }
}
```

Get all pending confessions. 

### Get All Confessions By User Id Or Logged In User

```json
POST /confession/user/{userId} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confessions": [
      {
        "id": 31,
        "title": "My Confession",
        "user": {
          "handle": "itsankitbhusal"
        }
      } 
    ]
  }
}
```

Get confessions by user id or logged in user if not provided.

### Get Confession By Handle

```json
POST /confession/user/handle/{handle}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confessions": [
      {
        "id": 1298,
        "title": "Confession Title",
        "user": {
          "handle": "username"
        }
      }
    ]
  }
}
```

Get confessions by user handle.

### Search Confession By Title 

```json
GET /confession/search?title={title} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confessions": [
      {
        "id": 1304,
        "title": "Matching Confession",
        "user": {
          "handle": "username"
        }
      }
    ]
  }
}
```

Search confessions by title.

## ConfessionTag

This section contains API requests related to confession tags.

### Create Confession Tag

```json
POST /confession-tag/{confessionId}/{tagId} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "confession_id": "675",
    "tag_id": "111" 
  }
}
```

Create a confession tag.

### Delete Confession Tag  

```json
DELETE /confession-tag/{confessionId}/{tagId}  
```

```json
// Sample Response
{
  "success": true,
  "data": "Delete confession tag successfully"
}
```

Delete a confession tag.

### Get Tags From Confession Id

```json  
GET /confession-tag/{confessionId}
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "tag": {
        "name": "tag1"
      }
    },
    {
      "tag": { 
        "name": "tag2"
      }
    }
  ]
}
```

Get tags for a confession.

### Get Confessions Related To Tags   

```json
GET /confession-tag/tag/{tagId}
```

```json 
// Sample Response
{
  "success": true,
  "data": [
    {
      "confession": {
        "title": "Related Confession",
        "user": {
          "handle": "username"
        }
      }
    }
  ]
}
```

Get confessions related to a tag.

## ConfessionVote  

This section contains API requests related to confession voting.

### Upvote   

```json 
POST /confession-vote/up/{confessionId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Confession vote created successfully."
}
```

Upvote a confession.

### Down Vote

```json
POST /confession-vote/down/{confessionId}  
```

```json 
// Sample Response
{
  "success": true,
  "data": "Confession vote created successfully."
}
```

Downvote a confession.

### Update Vote Up

```json
PUT /confession-vote/up/{confessionId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Confession vote updated successfully."
}
``` 

Update downvote to upvote for a confession.

### Update Up -> Down Vote  

```json 
PUT /confession-vote/down/{confessionId}
```

```json
// Sample Response
{
  "success": true,
  "data": "Confession vote updated successfully."
}
```

Update upvote to downvote for a confession.

### Delete Down Vote

```json  
DELETE /confession-vote/down/{confessionId} 
```

```json
// Sample Response
{
  "success": true,
  "data": "Confession vote deleted successfully."
} 
```

Delete downvote on a confession.

### Delete Up Vote

```json
DELETE /confession-vote/up/{confessionId}
```  

```json
// Sample Response  
{
  "success": true,
  "data": "Confession vote deleted successfully." 
}
```

Delete upvote on a confession.

### Get All Confession Votes  

```json
GET /confession-vote/
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "confession_id": 304,
      "user": {
        "handle": "username" 
      }
    },
    {
      "id": 23266,
      "confession_id": 222,
      "user": {
        "handle": "username"
      }
    }
  ]
}
```

Get all confession votes.

### Get Confession By Logged In User Or Logged In If Not Provided Id

```json  
GET /confession-vote/user/{userId}
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 23239,
      "confession_id": 909, 
      "user": {
        "handle": "itsankitbhusal"
      }
    }
  ]
}
```

Get confession votes by user id or logged in user.

### Get Confession Vote With Confession Id

```json
GET /confession-vote/confession/{confessionId} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 23264,
    "confession_id": 1331,
    "vote_type": "down",
    "user": {
      "handle": "itsankitbhusal"
    }
  }
}
```

Get confession vote for a confession.

### Get Confession Votes Count

```json
GET {{url}}/confession-vote/count/1331
```

```json
// sample response
{
    "success": true,
    "data": {
        "result": {
            "totalVoteCount": 3,
            "downvoteCount": 1,
            "upvoteCount": 4
        }
    }
}
```

Here are the remaining sections of the complete markdown documentation for the SpeakUp Postman collection:

## Notification

This section contains API requests related to user notifications.

### Create Notification

```json
POST /notification
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 12,
    "message": "Notification message"
  }
}
```

Create a notification.

### Get All Notifications By User Id

```json
GET /notification/user/{userId}
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 25,
      "message": "Notification message" 
    }
  ]
}
```

Get notifications for a user.

### Get Notification By Id

```json
GET /notification/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 4,
    "message": "Notification message"
  }
}
```

Get a notification.

### Update Notification Status

```json  
PUT /notification/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": "Notification updated successfully"
}
```

Mark notification as read.

### Delete Notification

```json
DELETE /notification/{id}
```

```json 
// Sample Response
{
  "success": true,
  "data": "Notification deleted successfully"
}
```

Delete a notification.

## Reporting

This section contains API requests related to reporting confessions and comments.

### Create Confession/Comment Report

```json
POST /reporting 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 118,
    "reporter_id": 239,
    "reported_object_type": "confession"
  }
}
```

Report a confession or comment.

### Get All Reporting  

```json
GET /reporting
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 118,
      "reporter_id": 239,
      "reported_object_type": "confession"
    }
  ]
} 
```

Get all reports.

### Get Reporting By Id

```json 
GET /reporting/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 8,
    "reporter_id": 219,
    "reported_object_type": "confession" 
  }
}
```

Get a report.

### Delete Reporting By Id

```json
DELETE /reporting/{id} 
```

```json
// Sample Response
{
  "success": true,
  "data": 1
}
```

Delete a report.

### Update Reporting Id  

```json
PUT /reporting/{id}
```

```json
// Sample Response  
{
  "success": true,
  "data": [1] 
}
```

Update a report.

### Get Reporting By Reporter

```json  
GET /reporting/user/{userId}
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 15,
      "reporter_id": 79,
      "reported_object_type": "comment"
    }
  ]
}
```

Get reports by a user.  

### Get By Reporting Object Type

```json
GET /reporting/object/{type} 
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 15,
      "reported_object_type": "comment" 
    }
  ]
}
```

Get reports by object type - confession or comment.

### Get Reporting By Resolved Status  

```json
GET /reporting/resolved/{boolean} 
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "is_resolved": true 
    }
  ]
}
```

Get reports by resolved status.

### Resolve Comment

```json
PUT /reporting/resolve/comment/{id}  
```

```json
// Sample Response
{
  "success": true,
  "data": [1]
}
```

Resolve a comment report.

### Resolve Confession  

```json  
PUT /reporting/resolve/confession/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": [1]  
}
```

Resolve a confession report.

## Tag

This section contains API requests related to managing tags.

### Get All Tags  

```json
GET /tag  
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 51,
      "name": "tag1"
    },
    {
      "id": 118, 
      "name": "tag2"
    }
  ]
}
```

Get all tags.

### Create Tag

```json
POST /tag
```

```json  
// Sample Response
{
  "success": true,
  "data": {
    "id": 119,
    "name": "newtag"
  }
}
```

Create a new tag.

### Get Tag With Id

```json  
GET /tag/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "tag"
  }
}
```

Get a tag.

### Update Tag  

```json 
PUT /tag/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": [1] 
}
```

Update tag name.

### Delete Tag

```json
DELETE /tag/{id}   
```

```json
// Sample Response 
{
  "success": true,
  "data": "Tag deleted successfully"
}
``` 

Delete a tag.

### Search Tags

```json 
GET /tag/search?name={name}
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 11,
      "name": "matchingtag"
    }
  ]
}
```

Search tags by name.

## View

This section contains API requests related to confession views.

### Create View

```json
POST /view/{confessionId}  
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 201207,
      "confession_id": "6" 
    },
    true
  ]
} 
```

Create a view on a confession.

### Get All Views By Confession Id  

```json
GET /view/{confessionId} 
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 433,
      "confession_id": 6 
    },
    {
      "id": 201207,
      "confession_id": 6
    }
  ]
}
```

Get views on a confession. 

### Get Total View Count By Confession Id

```json
GET /view/count/{confessionId}  
```

```json
// Sample Response
{
  "success": true,
  "data": 139
}
```

Get total views on a confession.

### Get All Views By User Id

```json
GET /view/user/{userId}
```

```json
// Sample Response  
{
  "success": true,
  "data": [
    {
      "id": 422,
      "confession_id": 263,
      "user_id": 38
    }
  ]
}
```

Get views by a user.

### Delete View By Id  

```json  
DELETE /view/{id}
```

```json
// Sample Response
{
  "success": true,
  "data": "View deleted successfully" 
}
```

Delete a view.

### Get If Logged In User Has Viewed Confession

```json
GET /view/user/confession/{confessionId} 
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "id": 200683,
    "confession_id": 1331,
    "user_id": 239
  }
}
```

Check if logged in user has viewed a confession.

## Analytics

This section contains API requests related to analytics.

### User Growth Rate Of 12 Weeks  

```json
GET /analytics/growth-rate
```

```json
// Sample Response
{
  "success": true,
  "data": {
    "growthRate": [0, 1, 2, 3] 
  }
}
```  

Get user growth rate for last 12 weeks.

### User Role Distribution   

```json
GET /analytics/roles  
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "role": "admin",
      "count": 5 
    },
    {
      "role": "user",
      "count": 10
    }
  ]
}
```

Get count of users by roles.  

### User Verification Distribution

```json 
GET /analytics/verification
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "is_verified": false,
      "count": 20
    },
    {
      "is_verified": true, 
      "count": 10
    }
  ]
} 
```

Get count of verified and unverified users.

### Confession Approval   

```json
GET /analytics/confession-approval 
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "is_approved": false,
      "count": 10 
    },
    {
      "is_approved": true,
      "count": 20
    }
  ]
}
```  

Get count of approved and pending confessions.

### Up Down Count Of 12 Weeks

```json
GET /analytics/up-down
```

```json 
// Sample Response
{
  "success": true,
  "data": {
    "upVoteCount": [1,2,3],
    "downVoteCount": [3,2,1]
  }
}
```

Get upvote and downvote count over 12 weeks.

## Recommendation

This section contains API request related to getting confession recommendations.

```json
GET /recommendation
```

```json
// Sample Response
{
  "success": true,
  "data": [
    {
      "id": 1298,
      "title": "Recommended Confession" 
    },
    {  
      "id": 945,
      "title": "Another Recommended Confession"
    }
  ]
}
```