import { Paper, makeStyles, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectIsLoading } from 'features/auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const handleLogin = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }))
  }

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button onClick={handleLogin} fullWidth variant="contained" color="primary">
            {isLoading && <CircularProgress size={20} color='secondary'></CircularProgress>} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
