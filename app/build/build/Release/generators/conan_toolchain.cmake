

# Conan automatically generated toolchain file
# DO NOT EDIT MANUALLY, it will be overwritten

# Avoid including toolchain file several times (bad if appending to variables like
#   CMAKE_CXX_FLAGS. See https://github.com/android/ndk/issues/323
include_guard()

message(STATUS "Using Conan toolchain: ${CMAKE_CURRENT_LIST_FILE}")

if(${CMAKE_VERSION} VERSION_LESS "3.15")
    message(FATAL_ERROR "The 'CMakeToolchain' generator only works with CMake >= 3.15")
endif()










string(APPEND CONAN_CXX_FLAGS " -m64")
string(APPEND CONAN_C_FLAGS " -m64")
string(APPEND CONAN_SHARED_LINKER_FLAGS " -m64")
string(APPEND CONAN_EXE_LINKER_FLAGS " -m64")



message(STATUS "Conan toolchain: C++ Standard 20 with extensions ON")
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_EXTENSIONS ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Extra c, cxx, linkflags and defines


if(DEFINED CONAN_CXX_FLAGS)
  string(APPEND CMAKE_CXX_FLAGS_INIT " ${CONAN_CXX_FLAGS}")
endif()
if(DEFINED CONAN_C_FLAGS)
  string(APPEND CMAKE_C_FLAGS_INIT " ${CONAN_C_FLAGS}")
endif()
if(DEFINED CONAN_SHARED_LINKER_FLAGS)
  string(APPEND CMAKE_SHARED_LINKER_FLAGS_INIT " ${CONAN_SHARED_LINKER_FLAGS}")
endif()
if(DEFINED CONAN_EXE_LINKER_FLAGS)
  string(APPEND CMAKE_EXE_LINKER_FLAGS_INIT " ${CONAN_EXE_LINKER_FLAGS}")
endif()

get_property( _CMAKE_IN_TRY_COMPILE GLOBAL PROPERTY IN_TRY_COMPILE )
if(_CMAKE_IN_TRY_COMPILE)
    message(STATUS "Running toolchain IN_TRY_COMPILE")
    return()
endif()

set(CMAKE_FIND_PACKAGE_PREFER_CONFIG ON)

# Definition of CMAKE_MODULE_PATH
list(PREPEND CMAKE_MODULE_PATH "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/opensbabb3938048c9/p/lib/cmake")
# the generators folder (where conan generates files, like this toolchain)
list(PREPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_LIST_DIR})

# Definition of CMAKE_PREFIX_PATH, CMAKE_XXXXX_PATH
# The explicitly defined "builddirs" of "host" context dependencies must be in PREFIX_PATH
list(PREPEND CMAKE_PREFIX_PATH "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/opensbabb3938048c9/p/lib/cmake")
# The Conan local "generators" folder, where this toolchain is saved.
list(PREPEND CMAKE_PREFIX_PATH ${CMAKE_CURRENT_LIST_DIR} )
list(PREPEND CMAKE_LIBRARY_PATH "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/b/drogo99e6d605690dd/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/trant17854819e674c/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/c-arebd8a4801d963f/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/jsoncb6ff2e28b1024/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/opensbabb3938048c9/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/util-b8423e63d0ce2/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/boost79f537833cdae/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/zlib3579ae9197e0e/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/bzip24ed69d4fecc16/p/lib" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/libbab546f21710147/p/lib")
list(PREPEND CMAKE_INCLUDE_PATH "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/b/drogo99e6d605690dd/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/trant17854819e674c/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/c-arebd8a4801d963f/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/jsoncb6ff2e28b1024/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/opensbabb3938048c9/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/util-b8423e63d0ce2/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/util-b8423e63d0ce2/p/include/uuid" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/boost79f537833cdae/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/zlib3579ae9197e0e/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/bzip24ed69d4fecc16/p/include" "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/libbab546f21710147/p/include")



if (DEFINED ENV{PKG_CONFIG_PATH})
set(ENV{PKG_CONFIG_PATH} "${CMAKE_CURRENT_LIST_DIR}:$ENV{PKG_CONFIG_PATH}")
else()
set(ENV{PKG_CONFIG_PATH} "${CMAKE_CURRENT_LIST_DIR}:")
endif()




# Variables
# Variables  per configuration


# Preprocessor definitions
# Preprocessor definitions per configuration
