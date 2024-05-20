import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

type TableCustomProps = {
  datas: {
    id: string;
    [key: string]: string | number | boolean | undefined | null | string[];
  }[];
  onRowClick: (rowData: unknown) => void;
  columns: {
    key: string;
    label: string;
    render?: (data: {
      [key: string]: string | number | boolean | undefined | null | string[];
    }) => JSX.Element;
    typographyVariant?: Variant;
  }[];
};

const TableCustom = ({ datas, onRowClick, columns }: TableCustomProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: 'auto',
        borderRadius: '15px',
        padding: '10px',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data, index) => (
            <TableRow
              key={data.id}
              hover
              onClick={() => onRowClick(data)}
              sx={{
                cursor: 'pointer',
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    borderBottom:
                      index === datas!.length - 1
                        ? 'none'
                        : '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  {column.render ? (
                    column.render(data)
                  ) : (
                    <Typography
                      variant={column.typographyVariant ?? 'subtitle2'}
                    >
                      {data[column.key as keyof typeof data] as string}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCustom;
