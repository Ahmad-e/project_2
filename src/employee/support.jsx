import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const EmployeePage = () => {
  // const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [response, setResponse] = useState("");
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
  const apiurl = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    axios
      .get(apiurl + "showMsgs", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.messages);
        console.log(response.data.messages);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleResponse = (e) => {
    setResponse(e.target.value);
  };

  const sendResponse = () => {
    // Here, you can add the logic to send the response to the customer
    console.log("Sending response:", response, "to", selectedCustomer.id);
    // setLoading(true);
    try {
      const response_ = axios
        .post(
          apiurl + "addAnswer",
          {
            question_id: selectedCustomer.id,
            answer: response,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response_) => {
          console.log(response_.data);
          setData(response_.data.messages);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      throw e;
    }
    setSelectedCustomer(null);
    setResponse("");
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleRowHover = (index) => {
    setHoveredRowIndex(index);
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(-1);
  };

  return (
    <div>
      <br />
      <h1>Messages From Customers</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Sent at</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Response data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((customer, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(customer)}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={handleRowLeave}
                style={{
                  backgroundColor:
                    hoveredRowIndex === index ? "#bb252f8c" : "transparent",
                  cursor: "pointer",
                }}
              >
                <TableCell>{customer.question}</TableCell>
                <TableCell>{customer.created_at}</TableCell>
                <TableCell>
                  {customer.answer === null ? (
                    <p className="main-color">not response</p>
                  ) : (
                    customer.answer
                  )}
                </TableCell>
                <TableCell>{customer.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCustomer && (
        <Dialog
          open={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        >
          <DialogTitle>{selectedCustomer.Name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Response"
              value={response}
              onChange={handleResponse}
              multiline
              rows={4}
              style={{ marginTop: "16px", width: "470px" }}
            />
            <br />
            <Button
              variant="contained"
              onClick={sendResponse}
              style={{
                marginTop: "16px",
                background: "#bb252f8c",
                right: "-150px",
              }}
            >
              Send Response
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeePage;
