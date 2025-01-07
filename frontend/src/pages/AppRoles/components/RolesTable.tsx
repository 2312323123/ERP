import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface Props {
  allRoles: { role: string; description: string }[]
}

const RolesTable = ({ allRoles }: Props) => {
  return (
    <>
      <Typography variant="h3" component="h3">
        Role
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>some bs column</TableCell> */}
              <TableCell align="right">Rola</TableCell>
              <TableCell align="left">Opis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRoles &&
              allRoles.map((row) => (
                <TableRow key={row.role}>
                  {/* <TableCell component="th" scope="row">
                    {row.role}
                  </TableCell> */}
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RolesTable
