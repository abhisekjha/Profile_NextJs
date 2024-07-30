import jpype
import jpype.imports
from jpype.types import *
from jpype import JClass


try:
    # Start JVM
    jpype.startJVM(jpype.getDefaultJVMPath(), "-ea", "-Djava.class.path=.")
    
    # Import Java class
    Example = JClass("Example")


    # Call the Java function with parameters and return value
    result = Example.add(1, 2)
    print(f"Result: {result}")

    
   

except Exception as e:
    print(f"An error occurred: {e}")
    
finally:
    # Shutdown JVM
    jpype.shutdownJVM()
