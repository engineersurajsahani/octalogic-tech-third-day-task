import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { useForm } from "react-hook-form";

function EmployeePanel() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State to track the employee to be deleted
  const { register, handleSubmit, reset } = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const response = await api.get("/employee");
      return response.data;
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/employee/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employee"]);
      setDeleteDialogOpen(false);
    },
  });

  const addOrUpdateEmployee = useMutation({
    mutationFn: async (employee) => {
      if (editingEmployee) {
        await api.put(`/employee/${editingEmployee._id}`, employee);
      } else {
        await api.post("/employee", employee);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employee"]);
      handleClose();
    },
  });

  const handleClickOpen = (employee) => {
    if (employee) {
      setEditingEmployee(employee);
      reset(employee);
    } else {
      setEditingEmployee(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
    reset();
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee); // Set the employee to be deleted
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const confirmDelete = () => {
    deleteEmployeeMutation.mutate(employeeToDelete._id); // Delete the employee
    setEmployeeToDelete(null); // Clear the employee to delete
  };

  const onSubmit = (data) => {
    addOrUpdateEmployee.mutate(data);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Container className="mt-2 mb-5">
      <Typography variant="h4" gutterBottom>
        Employee Table
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleClickOpen(null)}
        style={{ marginBottom: "16px" }}
      >
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee._id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleClickOpen(employee)}
                  >
                    Update
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingEmployee ? "Update Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              {...register("name", { required: true })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              variant="outlined"
              {...register("email", { required: true })}
            />
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              variant="outlined"
              {...register("role", { required: true })}
            />
            <TextField
              margin="dense"
              label="Salary"
              fullWidth
              variant="outlined"
              {...register("salary", { required: true })}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editingEmployee ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {employeeToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EmployeePanel;
