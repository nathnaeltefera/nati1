import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Dispatch, SetStateAction } from "react";
import { set } from "date-fns";

type Props = {
  columns: GridColDef[];
  rows: { id: string }[];
  slug: string;
  setUserRows: Dispatch<SetStateAction<{ id: string }[]>>;
};

const DataTable = (props: Props) => {
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });
  const deleteUser = async (userId: string) => {
    try {
      const userRef = doc(db, "Users", userId);
      await deleteDoc(userRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw new Error("Failed to delete user.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      props.setUserRows((prev) => prev.filter((row) => row.id !== id));
      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error state or display an error message
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        autoHeight={true}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;

// import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
// import "./dataTable.scss";
// import { Link } from "react-router-dom";
// import { deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase-config";

// type Props = {
//   columns: GridColDef[];
//   rows: { id: string }[];
//   slug: string;
// };

// const DataTable = ({ columns, rows, slug }: Props) => {

//   // Function to delete a user document from Firestore
//   const deleteUser = async (userId: string) => {
//     try {
//       const userRef = doc(db, "Users", userId);
//       await deleteDoc(userRef);
//       console.log("Document successfully deleted!");
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//       throw new Error("Failed to delete user.");
//     }
//   };

//   // Handler function for deleting a user
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteUser(id);
//       console.log("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       // Handle error state or display an error message
//     }
//   };

//   // Define the action column with view and delete buttons
//   const actionColumn: GridColDef = {
//     field: "action",
//     headerName: "Action",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div className="action">
//           {/* Link to view user details */}
//           <Link to={`/${slug}/${params.row.id}`}>
//             <img src="/view.svg" alt="View" />
//           </Link>
//           {/* Delete button */}
//           <div className="delete" onClick={() => handleDelete(params.row.id)}>
//             <img src="/delete.svg" alt="Delete" />
//           </div>
//         </div>
//       );
//     },
//   };

//   return (
//     <div className="dataTable">
//       {/* DataGrid component to display user data */}
//       <DataGrid
//         rows={rows}
//         columns={[...columns, actionColumn]} // Include actionColumn in columns
//         pageSize={10} // Number of rows per page
//         rowsPerPageOptions={[10]} // Options for rows per page (array of numbers)
//         checkboxSelection // Enable checkbox selection
//         disableColumnFilter // Disable column filters
//         disableDensitySelector // Disable density selector
//         disableColumnSelector // Disable column selector
//         disableSelectionOnClick // Disable row selection on click
//         components={{ Toolbar: GridToolbar }} // Use GridToolbar for toolbar
//         getRowId={(row) => row.id} // Function to get unique row id
//         autoHeight // Optional: Adjusts the height based on content
//       />
//     </div>
//   );
// };

// export default DataTable;
