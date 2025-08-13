import { lazy, Suspense, ComponentType } from "react";

// Lazy load framer-motion only when animations are needed
const FramerMotion = lazy(() => import("framer-motion"));

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  element?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

export function MotionWrapper({ 
  children, 
  element = "div",
  className = "",
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
  ...props 
}: MotionWrapperProps) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <FramerMotion>
        {({ motion }) => {
          const MotionElement = motion[element as keyof typeof motion] as ComponentType<any>;
          return (
            <MotionElement
              className={className}
              initial={initial}
              animate={animate}
              transition={transition}
              whileHover={whileHover}
              whileTap={whileTap}
              {...props}
            >
              {children}
            </MotionElement>
          );
        }}
      </FramerMotion>
    </Suspense>
  );
}

// Convenience components for common elements
export const MotionDiv = (props: MotionWrapperProps) => 
  <MotionWrapper element="div" {...props} />;

export const MotionButton = (props: MotionWrapperProps) => 
  <MotionWrapper element="button" {...props} />;

export const MotionImg = (props: MotionWrapperProps) => 
  <MotionWrapper element="img" {...props} />;

export const MotionH1 = (props: MotionWrapperProps) => 
  <MotionWrapper element="h1" {...props} />;

export const MotionSection = (props: MotionWrapperProps) => 
  <MotionWrapper element="section" {...props} />;
