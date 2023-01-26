import React, {useMemo, useState} from 'react';
import {ActionList, Button, Icon, Popover} from "@shopify/polaris";
import {MobileVerticalDotsMajor} from "@shopify/polaris-icons";

const TableRowPopover = ({id, bulkActions = [], setIsActionsDisable}) => {
    const [isActionsActive, setIsActionsActive] = useState(false);

    const toggleActionsList = () => {
        // setIsActionsDisable && setIsActionsDisable(true);
        setIsActionsActive((status) => !status);
    };

    /**
     * @description Add popover closing function to actions
     * @returns {Array} - Array of objects - Action list items
     */
    const actions = useMemo(() => {
        if (bulkActions?.length) {
            return bulkActions.map((item) => {
                return {
                    ...item,
                    onAction: () => {
                        item.onAction(id);
                        setIsActionsActive(false);
                    }
                }
            });
        }
    }, [bulkActions, setIsActionsActive]);

    const activator = (
        <Button
            plain
            icon={<Icon source={MobileVerticalDotsMajor} color="critical" />}
            onClick={toggleActionsList}
            ariaHaspopup
            disabled={false}
        />
    );

    return (
        <Popover
            id={id}
            active={isActionsActive}
            activator={activator}
            onClose={toggleActionsList}
        >
            <Popover.Pane>
                <div onClick={(e) => e.stopPropagation()}>
                    <ActionList items={actions}/>
                </div>
            </Popover.Pane>
        </Popover>
    );
};

export default TableRowPopover;