import React, {useMemo} from 'react';
import classNames from 'classnames';
import {IndexTable, TextStyle, Badge} from '@shopify/polaris';
import TableRowPopover from '../../common/TableRowPopover/TableRowPopover';
import {SEGMENTS_STATUSES} from '../../../common/constants/constants';
import styles from "../SegmentsTable/SegmentsTable.module.scss";

const SegmentsTableRow = (props) => {
    const {
        id,
        index,
        selectedResources,
        name,
        status,
        size = 0,
        // isActionsDisable,
        bulkActions,
        // setIsActionsDisable
    } = props;

    /**
     * @description Set content for set status action
     * @returns {Array} - Array of objects - Action list items
     */
    const actions = useMemo(() => {
        if (bulkActions?.length) {
            return bulkActions.map((item) => (
                item.id === 'status' ? {
                    ...item,
                    content: status === SEGMENTS_STATUSES[0] ? SEGMENTS_STATUSES[1] : SEGMENTS_STATUSES[0],
                } : item
            ));
        }
    }, [bulkActions]);

    const badgeStatus = useMemo(() => {
        switch (status) {
            case SEGMENTS_STATUSES[1]:
                return 'info'
            case SEGMENTS_STATUSES[2]:
                return 'success'
            default:
                return null
        }
    }, [status]);

    // const classnames = classNames(styles.Popover, isActionsDisable && styles.Popover__disable);
    const classnames = classNames(styles.Popover);

    return (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
                <TextStyle variation="strong">
                    {name}
                </TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Badge status={badgeStatus}>
                    {status}
                </Badge>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {size}
            </IndexTable.Cell>
            <IndexTable.Cell flush>
                <div className={classnames}>
                    <TableRowPopover id={id} bulkActions={actions} /*setIsActionsDisable={setIsActionsDisable}*//>
                </div>
            </IndexTable.Cell>
        </IndexTable.Row>
    );
};

export default SegmentsTableRow;