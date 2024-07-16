// import { GridColDef } from "@mui/x-data-grid";
// import DataTable from "../../components/dataTable/DataTable";
// import "./Users.scss";
// import { useState } from "react";
// import Add from "../../components/add/Add";
// import { userRows } from "../../data";
// // import { useQuery } from "@tanstack/react-query";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
//   {
//     field: "firstName",
//     type: "string",
//     headerName: "First name",
//     width: 150,
//   },
//   {
//     field: "lastName",
//     type: "string",
//     headerName: "Last name",
//     width: 150,
//   },
//   {
//     field: "email",
//     type: "string",
//     headerName: "Email",
//     width: 200,
//   },
//   {
//     field: "phone",
//     type: "string",
//     headerName: "Phone",
//     width: 200,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 200,
//     type: "string",
//   },
//   {
//     field: "verified",
//     headerName: "Verified",
//     width: 150,
//     type: "boolean",
//   },
// ];

// const Users = () => {
//   const [open, setOpen] = useState(false);

//   // TEST THE API

//   // const { isLoading, data } = useQuery({
//   //   queryKey: ["allusers"],
//   //   queryFn: () =>
//   //     fetch("http://localhost:8800/api/users").then(
//   //       (res) => res.json()
//   //     ),
//   // });

//   return (
//     <div className="users">
//       <div className="info">
//         <h1>Users</h1>
//         <button onClick={() => setOpen(true)}>Add New User</button>
//       </div>
//       <DataTable slug="users" columns={columns} rows={userRows} />
//       {/* TEST THE API */}

//       {/* {isLoading ? (
//         "Loading..."
//       ) : (
//         <DataTable slug="users" columns={columns} rows={data} />
//       )} */}
//       {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
//     </div>
//   );
// };

// export default Users;

// import { GridColDef } from "@mui/x-data-grid";
// import DataTable from "../../components/dataTable/DataTable";
// import "./Users.scss";
// import { useState, useEffect } from "react";
// import Add from "../../components/add/Add";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase-config";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
//   {
//     field: "firstName",
//     type: "string",
//     headerName: "First name",
//     width: 150,
//   },
//   {
//     field: "lastName",
//     type: "string",
//     headerName: "Last name",
//     width: 150,
//   },
//   {
//     field: "email",
//     type: "string",
//     headerName: "Email",
//     width: 200,
//   },
//   {
//     field: "phone",
//     type: "string",
//     headerName: "Phone",
//     width: 200,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 200,
//     type: "string",
//   },
//   {
//     field: "verified",
//     headerName: "Verified",
//     width: 150,
//     type: "boolean",
//   },
// ];

// const Users = () => {
//   const [open, setOpen] = useState(false);
//   const [userRows, setUserRows] = useState<{ id: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   const fetchUsers = async (retryCount = 3) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const usersData = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         console.log("Fetched user data:", data);

//         return {
//           id: doc.id,
//           img: data.img || "/noavatar.png",
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           email: data.email || "",
//           phone: data.phone || "",
//           createdAt: data.createdAt || "",
//           verified: data.verified || false,
//         };
//       });
//       setUserRows(usersData);
//       console.log("Processed user rows:", usersData);
//       setLoading(false);
//     } catch (err: any) {
//       console.error("Error fetching users:", err);
//       if (retryCount > 0) {
//         console.log(`Retrying... (${retryCount})`);
//         setTimeout(() => fetchUsers(retryCount - 1), 1000);
//       } else {
//         setError(err.message);
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="users">
//       <div className="info">
//         <h1>Users</h1>
//         <button onClick={() => setOpen(true)}>Add New User</button>
//       </div>
//       <DataTable slug="users" columns={columns} rows={userRows} />
//       {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
//     </div>
//   );
// };

// export default Users;

import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState, useEffect } from "react";
import Add from "../../components/add/Add";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "verified 1 or 2",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userRows, setUserRows] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null as any);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users")); // Adjust collection name here
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          setUserRows([]);
          setLoading(false);
          return;
        }
        const usersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            img: data.img || "/noavatar.png",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            createdAt: new Date().toLocaleDateString(data.createdAt) || "",
            verified: data.verified || false,
          };
        });
        setUserRows(usersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError((err as any).message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable
        setUserRows={setUserRows}
        slug="users"
        columns={columns}
        rows={userRows}
      />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
