/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tooltip,
    Fab,
    Typography,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Switch,
    Avatar,
    Grow,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { CallMadeRounded } from '@material-ui/icons';
import EditEventForm from './EditEventFormUp';
import CreateEventForm from './CreateEventFormUp';
import TableTitle from './CustomTableTitle';
import CustomSearchRender from './CustomTableSearchBox';
import StatusChip from './StatusChip';
import * as Utils from '../utils';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tablePaper: {
        borderRadius: '4px',
        padding: theme.spacing(0, 2),
    },
    memAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const EventsPage = ({
    events,
    editEvent,
    deleteEvent,
    users,
    createEvent,
    eventError,
}) => {
    const classes = useStyles();
    const { allEvents } = events;
    const curUser = users.user;
    const dumUsers = users.allUsers;

    const getEventRow = (event) => {
        return [
            event.name,
            Utils.EventUtils.getStatus(event),
            event.description,
            event.start_date.toDateString(),
            event.end_date.toDateString(),
            event.display_on_website ? 'True' : 'False',
            [
                ...dumUsers
                    .filter((user) => event.assignee.includes(user._id))
                    .map((user) => user.name),
            ],
            event.url.get('url'),
        ];
    };

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return <StatusChip status={value} />;
                },
            },
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'startDate',
            label: 'Start Date',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'endDate',
            label: 'End Date',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'display',
            label: 'On Main Website',
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Tooltip title="Go to Edit to change this">
                        <Switch checked={value === 'True'} />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'mems',
            label: 'Members',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const eventMems = dumUsers.filter((user) =>
                        value.includes(user.name)
                    );
                    let itemWidth;
                    let flag;
                    if (value.length === 0) {
                        flag = 0;
                        itemWidth = 12;
                    } else if (value.length >= 1 && value.length <= 4) {
                        flag = 1;
                        itemWidth = 12 / value.length;
                    } else if (value.length === 5 || value.length === 6) {
                        flag = 1;
                        itemWidth = 2;
                    } else if (value.length > 6 && value.length <= 12) {
                        flag = 1;
                        itemWidth = 1;
                    } else {
                        flag = 2;
                        itemWidth = 2;
                    }
                    return (
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            {flag === 0 && (
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontFamily: 'Monospace',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    No Members Assigned
                                </Typography>
                            )}
                            {flag === 2 && (
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontFamily: 'Monospace',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Too many members !
                                </Typography>
                            )}
                            {eventMems.map((mem) => (
                                <Grid item xs={itemWidth}>
                                    <Tooltip title={mem.name}>
                                        <Avatar
                                            className={classes.memAvatar}
                                            src={mem.url.get('picture_url')}
                                            alt=""
                                        />
                                    </Tooltip>
                                </Grid>
                            ))}
                        </Grid>
                    );
                },
            },
        },
        {
            name: 'url',
            label: 'URL',
            options: {
                filter: false,
                customBodyRender: (url) => (
                    <Tooltip title="Go to event url">
                        <Fab
                            size="small"
                            color="secondary"
                            target="_blank"
                            href={url}
                        >
                            <CallMadeRounded
                                style={{ color: '#636366', fontWeight: 'bold' }}
                            />
                        </Fab>
                    </Tooltip>
                ),
            },
        },
        {
            name: 'edit',
            label: 'Edit',
            options: {
                filter: false,
                download: false,
                print: false,
                display: curUser.privelege_level === 'Admin',
                viewColumn: curUser.privelege_level === 'Admin',
                customBodyRender: (value, tableMeta) => (
                    <>
                        {curUser.privelege_level === 'Admin' ? (
                            <EditEventForm
                                deleteEvent={deleteEvent}
                                dumEvents={allEvents}
                                dumUsers={users.allUsers}
                                editEvent={editEvent}
                                index={tableMeta.rowIndex}
                                serverError={events.serverError}
                            />
                        ) : null}
                    </>
                ),
            },
        },
    ];
    const data = [...allEvents.map((event) => getEventRow(event))];
    const options = {
        filterType: 'checkbox',
        responsive: 'scrollMaxHeight',
        rowsPerPage: 7,
        selectableRows: 'none',
        fixedHeader: true,
        fixedSelectColumn: false,
        rowsPerPageOptions: [5, 7, 10, 15, 25, 50, 100],
        customSearchRender: (searchText, handleSearch, hideSearch, opt) => {
            return (
                <CustomSearchRender
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    options={opt}
                />
            );
        },
        searchPlaceholder: 'Search Event',
    };

    const [createOpen, setCreateOpen] = React.useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    return events.errMess !== null ? (
        <Typography variant="h4" color="textSecondary">
            Failed to fetch Events!
        </Typography>
    ) : (
        <>
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={11}>
                        <MUIDataTable
                            title={
                                <TableTitle
                                    title="Add Event"
                                    addAction={handleCreateOpen}
                                />
                            }
                            data={data}
                            columns={columns}
                            options={options}
                            className={classes.tablePaper}
                        />
                    </Grid>
                </Grid>
            </Grow>
            <Dialog open={createOpen} maxWidth="sm" onClose={handleCreateClose}>
                <DialogTitle>
                    <Typography variant="h5" align="center" fullWidth>
                        Create An Event
                    </Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleCreateClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CreateEventForm
                        createEvent={createEvent}
                        eventError={eventError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

EventsPage.propTypes = {
    events: PropTypes.object.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    createEvent: PropTypes.func.isRequired,
    eventError: PropTypes.string.isRequired,
};

export default EventsPage;
