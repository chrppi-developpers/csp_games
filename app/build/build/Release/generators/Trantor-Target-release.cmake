# Avoid multiple calls to find_package to append duplicated properties to the targets
include_guard()########### VARIABLES #######################################################################
#############################################################################################
set(trantor_FRAMEWORKS_FOUND_RELEASE "") # Will be filled later
conan_find_apple_frameworks(trantor_FRAMEWORKS_FOUND_RELEASE "${trantor_FRAMEWORKS_RELEASE}" "${trantor_FRAMEWORK_DIRS_RELEASE}")

set(trantor_LIBRARIES_TARGETS "") # Will be filled later


######## Create an interface target to contain all the dependencies (frameworks, system and conan deps)
if(NOT TARGET trantor_DEPS_TARGET)
    add_library(trantor_DEPS_TARGET INTERFACE IMPORTED)
endif()

set_property(TARGET trantor_DEPS_TARGET
             PROPERTY INTERFACE_LINK_LIBRARIES
             $<$<CONFIG:Release>:${trantor_FRAMEWORKS_FOUND_RELEASE}>
             $<$<CONFIG:Release>:${trantor_SYSTEM_LIBS_RELEASE}>
             $<$<CONFIG:Release>:c-ares::cares;openssl::openssl>
             APPEND)

####### Find the libraries declared in cpp_info.libs, create an IMPORTED target for each one and link the
####### trantor_DEPS_TARGET to all of them
conan_package_library_targets("${trantor_LIBS_RELEASE}"    # libraries
                              "${trantor_LIB_DIRS_RELEASE}" # package_libdir
                              "${trantor_BIN_DIRS_RELEASE}" # package_bindir
                              "${trantor_LIBRARY_TYPE_RELEASE}"
                              "${trantor_IS_HOST_WINDOWS_RELEASE}"
                              trantor_DEPS_TARGET
                              trantor_LIBRARIES_TARGETS  # out_libraries_targets
                              "_RELEASE"
                              "trantor"    # package_name
                              "${trantor_NO_SONAME_MODE_RELEASE}")  # soname

# FIXME: What is the result of this for multi-config? All configs adding themselves to path?
set(CMAKE_MODULE_PATH ${trantor_BUILD_DIRS_RELEASE} ${CMAKE_MODULE_PATH})

########## GLOBAL TARGET PROPERTIES Release ########################################
    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_LINK_LIBRARIES
                 $<$<CONFIG:Release>:${trantor_OBJECTS_RELEASE}>
                 $<$<CONFIG:Release>:${trantor_LIBRARIES_TARGETS}>
                 APPEND)

    if("${trantor_LIBS_RELEASE}" STREQUAL "")
        # If the package is not declaring any "cpp_info.libs" the package deps, system libs,
        # frameworks etc are not linked to the imported targets and we need to do it to the
        # global target
        set_property(TARGET Trantor::Trantor
                     PROPERTY INTERFACE_LINK_LIBRARIES
                     trantor_DEPS_TARGET
                     APPEND)
    endif()

    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_LINK_OPTIONS
                 $<$<CONFIG:Release>:${trantor_LINKER_FLAGS_RELEASE}> APPEND)
    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_INCLUDE_DIRECTORIES
                 $<$<CONFIG:Release>:${trantor_INCLUDE_DIRS_RELEASE}> APPEND)
    # Necessary to find LINK shared libraries in Linux
    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_LINK_DIRECTORIES
                 $<$<CONFIG:Release>:${trantor_LIB_DIRS_RELEASE}> APPEND)
    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_COMPILE_DEFINITIONS
                 $<$<CONFIG:Release>:${trantor_COMPILE_DEFINITIONS_RELEASE}> APPEND)
    set_property(TARGET Trantor::Trantor
                 PROPERTY INTERFACE_COMPILE_OPTIONS
                 $<$<CONFIG:Release>:${trantor_COMPILE_OPTIONS_RELEASE}> APPEND)

########## For the modules (FindXXX)
set(trantor_LIBRARIES_RELEASE Trantor::Trantor)
