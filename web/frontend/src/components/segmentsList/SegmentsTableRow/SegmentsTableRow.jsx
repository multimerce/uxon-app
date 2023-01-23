import React, {useState} from 'react';
import {ActionList, Button, Icon, IndexTable, Popover, Tag, TextStyle} from "@shopify/polaris";
import styles from "../SegmentsTable/SegmentsTable.module.scss";
import {MobileVerticalDotsMajor} from "@shopify/polaris-icons";

const SegmentsTableRow = ({id, index, selectedResources, name, status, size = 0, bulkActions}) => {
    const [isActionsActive, setIsActionsActive] = useState(false);
    const toggleActionsList = () => {
        setIsActionsActive((status) => !status);
    };
    const activator = (
        <div onClick={(event) => event.stopPropagation()}>
            <Button
                plain
                icon={<Icon source={MobileVerticalDotsMajor} color="critical" />}
                onClick={toggleActionsList}
                ariaHaspopup
                disabled={false}
            />
        </div>
    );

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
                <Tag>
                    {status}
                </Tag>
            </IndexTable.Cell>
            <IndexTable.Cell>{size}</IndexTable.Cell>
            <div className={styles.Popover}>
                <Popover
                    id="segment-popover"
                    active={isActionsActive}
                    activator={activator}
                    onClose={toggleActionsList}
                >
                    <Popover.Pane>
                        <div>
                            <ActionList items={bulkActions} />
                        </div>
                    </Popover.Pane>
                </Popover>
            </div>
        </IndexTable.Row>
    );
};

export default SegmentsTableRow;