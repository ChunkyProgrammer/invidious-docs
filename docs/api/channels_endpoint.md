# API - Channels endpoint

Please refer to the [Common object types](./common_types.md) page for more
details on the various JSON objects used below.


##### GET `/api/v1/channels/:id`

> Response:

```javascript
{
	"author": String,
	"authorId": String,
	"authorUrl": String,
	"authorVerified": Boolean,
	"authorBanners": [
		// One or more ImageObject
	],
	"authorThumbnails": [
		// One or more ImageObject
	],

	"subCount": Number, // Integer
	"totalViews": Number, // Integer
	"joined": Number, // Unix timestamp

	"autoGenerated": Boolean,
	"isFamilyFriendly": Boolean,

	"description": String,
	"descriptionHtml": String,
	"allowedRegions": String[],

	"tabs": String[],

	"latestVideos": [
		// One or more VideoObject
	],
	"relatedChannels": [
		// One or more ChannelObject
	]
}
```


##### GET `/api/v1/channels/:id/channels`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.

> Response:

```javascript
{
	"relatedChannels": [
		// One or more ChannelObject
	],
	"continuation": String
}
```


##### GET `/api/v1/channels/:id/latest`

This is the same as requesting `/api/v1/channels/:id/videos` without URL parameters.


##### GET `/api/v1/channels/:id/playlists`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.
* `sort_by`: Sort order filter. Accepted values: `oldest`, `newest`, `last`. Defaults to `last`.

> Response:

```javascript
{
	"playlists": [
		// One or more PlaylistOject
	],
	"continuation": continuation
}
```

##### GET `/api/v1/channels/:id/podcasts`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.

> Response:

```javascript
{
	"playlists": [
		// One or more PlaylistOject
	],
	"continuation": continuation
}
```

##### GET `/api/v1/channels/:id/releases`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.

> Response:

```javascript
{
	"playlists": [
		// One or more PlaylistOject
	],
	"continuation": continuation
}
```

##### GET `/api/v1/channels/:id/shorts`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.

> Response:

See: GET `/api/v1/channels/:id/videos`


##### GET `/api/v1/channels/:id/streams`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.

> Response:

See: GET `/api/v1/channels/:id/videos`


##### GET `/api/v1/channels/:id/videos`

> URL parameters:

* `continuation`: A continuation token to get the next chunk of items. The token is provided each time this API is requested.
* `sort_by`: Sort order filter. Accepted values: `newest`, `popular` or `oldest` (Broken as of 10/2022). Default to `newest`.

> Response:

```javascript
{
	"videos": [
		// One or more VideoObject
	],
	"continuation": String
}
```

##### GET `/api/v1/channels/:id/community`

Please refer to the [Community Post Attachment types](#community-post-attachment-types) below for more details on the attachment JSON objects used below.

> Url parameters

* `continuation`: A continuation token to get the next chunk of items.

> Response:

```javascript
{
	"authorId": String,
	"comments": {
		"attachment": ImageAttachment | MultiImageAttachment | VideoAttachment | PollAttachment | PlaylistAttachment
		"author": String,
		"authorIsChannelOwner": Boolean
		"authorId": String,
		"authorThumbnails": ImageObject[],
		"authorUrl": String,
		"commentId": String,
		"content": String,
		"contentHtml": String,
		"isEdited": Boolean,
		"likeCount": Number,
		"published": Number,
		"publishedText": String,
		"replyCount": Number
	}[]
}
```

##### GET `/api/v1/channels/:id/search`

> Schema:

```javascript
[
  {
    type: "video",
    title: String,
    videoId: String,
    author: String,
    authorId: String,
    authorUrl: String,
    videoThumbnails: [
      {
        quality: String,
        url: String,
        width: Int32,
        height: Int32
      }
    ],
    description: String,
    descriptionHtml: String,
    viewCount: Int64,
    published: Int64,
    publishedText: String,
    lengthSeconds: Int32,
    liveNow: Bool,
    paid: Bool,
    premium: Bool
  },
  {
    type: "playlist",
    title: String,
    playlistId: String,
    author: String,
    authorId: String,
    authorUrl: String,

    videoCount: Int32,
    videos: [
      {
        title: String,
        videoId: String,
        lengthSeconds: Int32,
        videoThumbnails: [
          {
            quality: String,
            url: String,
            width: Int32,
            height: Int32
          }
        ]
      }
    ]
  },
  {
    type: "channel",
    author: String,
    authorId: String,
    authorUrl: String,

    authorThumbnails: [
      {
        url: String,
        width: Int32,
        height: Int32
      }
    ],
    subCount: Int32,
    videoCount: Int32,
    description: String,
    descriptionHtml: String
  }
];
```

Parameters:

```
q: String
page: Int32
```

###### Community Post Attachment Types
__VideoAttachment__ 
See [VideoObject](./common_types.md#videoobject) common type

__PlaylistAttachment__
See [PlaylistObject](./common_types.md#playlistobject) common type

__ImageAttachment__

```javascript
{
    "type": "image",
    "imageThumbnails": ImageObject[]
}
```

__MultiImageAttachment__

```javascript
{
    "type": "multiImage",
    "images": ImageObject[][]
}
```

__PollAttachment__

```javascript
{
	"type": "poll",
	"totalVotes": Number,
	"choices": {
		"text": String,
		"image?": ImageObject[]
	}[]

}
```

__Unknown__

This usually means that parsing support for the attachment type has not yet been implemented.

```javascript
{
    "type": "unknown",
    "error": String
}
```
