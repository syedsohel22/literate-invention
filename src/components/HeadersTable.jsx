import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
const HeadersTable = ({ headers: propHeaders, setHeaders: propSetHeaders }) => {
  const [newHeader, setNewHeader] = useState({ key: "", value: "" });

  HeadersTable.propTypes = {
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    setHeaders: PropTypes.func.isRequired,
  };
  const handleAddHeader = () => {
    propSetHeaders([...propHeaders, newHeader]);
    setNewHeader({ key: "", value: "" });
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = propHeaders.filter((_, i) => i !== index);
    propSetHeaders(updatedHeaders);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {propHeaders.map((header, index) => (
            <TableRow key={index}>
              <TableCell>{header.key}</TableCell>
              <TableCell>{header.value}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveHeader(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                placeholder="Key"
                value={newHeader.key}
                onChange={(e) =>
                  setNewHeader({ ...newHeader, key: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <TextField
                placeholder="Value"
                value={newHeader.value}
                onChange={(e) =>
                  setNewHeader({ ...newHeader, value: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleAddHeader}>Add</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default HeadersTable;
