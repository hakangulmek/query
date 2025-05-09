import React from "react";

function albumList({ user }: { user: { id: number; name: string } }) {
  return <div>{user.name} Albümü</div>;
}

export default albumList;
