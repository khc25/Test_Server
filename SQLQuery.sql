//PK = Primary Key, FK = Foreign Key

//Blog (PK id, title, content)
//Blog(1, My introduction, 1234)

//commentTable(id,FK blog_id, comment,FK username)
//comment(20, 1, fhoiashf, brianchow25)
//commment(29, 1, fiaoehfawiohd, wilson123)

//User (PK id, username, password)

//Get Blogs' comment
//SELECT comment FROM commentTable JOIN Blog ON Blog.id = commentTable.blog_id;

//GET Blog's comment;
//SELECT comment FROM commentTable where blog_id = 1;

//Get users' comment
//SELECT comment FROM commentTable JOIN User ON user.username = commentTable.username;