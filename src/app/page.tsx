"use client";
import UserListItem from "./component/userListItem";
import { useFetchUsersQuery } from "./store";
import { Skeleton } from "@mui/material";

interface User {
  id: number;
  name: string; // Örnek olarak bir 'name' alanı ekledim, API'nize göre düzenleyin
  email: string; // API'deki diğer alanları da ekleyin
}
export default function Home() {
  const { data, isError, isFetching } = useFetchUsersQuery({});
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
    );
  } else if (isError) {
    content = <div>Error</div>;
  } else {
    content = data.map((user: User) => {
      return <UserListItem key={user.id} user={user} />;
    });
  }

  return <div>{content}</div>;
}
