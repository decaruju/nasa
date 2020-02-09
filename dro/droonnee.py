print("Start simulator (SITL)")
import time
import dronekit_sitl

# Import DroneKit-Python
from dronekit import connect, VehicleMode, LocationGlobal

def arm_and_takeoff(vehicle, aTargetAltitude):
    """
    Arms vehicle and fly to aTargetAltitude.
    """

    print("Basic pre-arm checks")
    # Don't try to arm until autopilot is ready
    while not vehicle.is_armable:
        print(" Waiting for vehicle to initialise...")
        time.sleep(1)

    print("Arming motors")
    # Copter should arm in GUIDED mode
    vehicle.mode    = VehicleMode("GUIDED")
    vehicle.armed   = True

    # Confirm vehicle armed before attempting to take off
    while not vehicle.armed:
        print(" Waiting for arming...")
        time.sleep(1)

    print("Taking off!")
    vehicle.simple_takeoff(aTargetAltitude) # Take off to target altitude

    # Wait until the vehicle reaches a safe height before processing the goto (otherwise the command
    #  after Vehicle.simple_takeoff will execute immediately).
    while True:
        print(" Altitude: ", vehicle.location.global_relative_frame.alt)
        #Break and return from function just below target altitude.
        if vehicle.location.global_relative_frame.alt>=aTargetAltitude*0.95:
            print("Reached target altitude")
            break
        time.sleep(1)


def doit(callback):
     sitl = dronekit_sitl.start_default(lat=46.53443, lon=-72.75409)
     connection_string = sitl.connection_string()
     vehicle = connect(connection_string, wait_ready=True)

     vehicle.add_attribute_listener('location.global_frame', callback)

     arm_and_takeoff(vehicle, 30)


     loc = LocationGlobal(46.54542, -72.74997, 30)
     vehicle.simple_goto(loc, airspeed=5, groundspeed=5)
## Close vehicle object before exiting script
#vehicle.close()
#
## Shut down simulator
#sitl.stop()
#print("Completed")
