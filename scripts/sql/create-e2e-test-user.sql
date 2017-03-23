/*The following is a script must be run before e2e test for following components: Home, Login, Create User, User List, User Edit, */
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (50, 'test@bug.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '1', 'tester');

/*The following is a script that populates the userlist with 10 other users to ensure that every user has at least 11 users*/
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (51, 'rick@rickandmorty.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'Rick');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (52, 'morty@rickandmorty.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'Morty');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (53, 'huey@duck.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'huey');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (54, 'dewey@duck.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'dewey');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (55, 'louie@duck.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'louie');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (56, 'mickey@mouse.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'mickey');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (57, 'minnie@mouse.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'minnie');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (58, 'donald@duck.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'donald');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (59, 'pluto@dog.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'pluto');
insert into `users` (`id`, `email`, `password`, `role`, `name`) values (60, 'goofy@dog.com', 'b05ebef6da920b9f6cffa2735b6d8f93', '2', 'goofy');