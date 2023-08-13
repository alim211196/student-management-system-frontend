import { Grid } from '@mui/material';
import React,{memo} from 'react'
import SearchAppBar from '../../../Utils/SearchAppBar';

const StudentSearch = ({ setQuery, query, cookies, matches }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        p: 1,
      }}
    >
      <Grid item xs={12} sm={4} md={4} sx={{ background:'#292929',borderRadius:'5px' }}>
        <SearchAppBar
          setQuery={setQuery}
          query={query}
          cookies={cookies}
          matches={matches.toString()}
        />
      </Grid>
    </Grid>
  );
};

export default memo(StudentSearch)