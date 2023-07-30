import React, { ElementType } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { refs, floatingStyles, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  const id = useId()
  return (
    <Element className={className}>
      <div
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        ref={refs.setReference}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={refs.setFloating}
                style={floatingStyles}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                  ref={arrowRef}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </Element>
  )
}
