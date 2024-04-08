import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';

function CardItem({ title, Icon, quantity, className }) {
  return (
    <Card className="flex h-full">
      <CardBody className="flex items-center border border-gray-400 dark:border-gray-400 w-full rounded-lg">
        <div
          className={`flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg ${className}`}
        >
          <Icon />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-[#9E9E9EFF]">
            {title}
          </p>
          <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-300">
            {quantity}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default CardItem;
