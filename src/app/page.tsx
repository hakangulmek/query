"use client";
import UserListItem from "./component/userListItem";
import { useAddUserMutation, useFetchUsersQuery } from "./store";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface User {
  id: number;
  name: string; // Örnek olarak bir 'name' alanı ekledim, API'nize göre düzenleyin
  email: string; // API'deki diğer alanları da ekleyin
}
export default function Home() {
  const { data, isError, isFetching } = useFetchUsersQuery({});
  const [addUser, results] = useAddUserMutation();

  const handleAddUser = () => {
    addUser();
  }; // Kullanıcı ekleme işlemini burada gerçekleştirin
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

  return (
    <div>
      <div className="topArrangement">
        <h1 style={{ fontSize: "20px" }}>Kişiler</h1>
        <Button variant="outlined" onClick={handleAddUser}>
          {results.isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <span>Kişi Ekle+ </span>
          )}
        </Button>
      </div>
      {content}
    </div>
  );
}
