#ifndef __AS__TYPE_MpRecipeUISetupConfirmType
#define __AS__TYPE_MpRecipeUISetupConfirmType
typedef struct MpRecipeUISetupConfirmType
{	plcbit RecipeLoad;
	plcbit RecipeSave;
	plcbit RecipeCreate;
	plcbit RecipeDelete;
	plcbit RecipeRename;
} MpRecipeUISetupConfirmType;
#endif

#ifndef __AS__TYPE_MpRecipeUISetupType
#define __AS__TYPE_MpRecipeUISetupType
typedef struct MpRecipeUISetupType
{	unsigned short RecipeListSize;
	unsigned char RecipeListScrollWindow;
	MpRecipeUISetupConfirmType Confirmation;
	plcbit AutoLoadHeader;
} MpRecipeUISetupType;
#endif

#ifndef __AS__TYPE_MpRecipeUIMessageEnum
#define __AS__TYPE_MpRecipeUIMessageEnum
typedef enum MpRecipeUIMessageEnum
{	mpRECIPE_UI_MSG_NONE = 0,
	mpRECIPE_UI_MSG_CONFIRM_LOAD = 1,
	mpRECIPE_UI_MSG_CONFIRM_SAVE = 2,
	mpRECIPE_UI_MSG_CONFIRM_CREATE = 3,
	mpRECIPE_UI_MSG_CONFIRM_DELETE = 4,
	mpRECIPE_UI_MSG_CONFIRM_RENAME = 5,
} MpRecipeUIMessageEnum;
#endif

#ifndef __AS__TYPE_MpRecipeUIStatusEnum
#define __AS__TYPE_MpRecipeUIStatusEnum
typedef enum MpRecipeUIStatusEnum
{	mpRECIPE_UI_STATUS_IDLE = 0,
	mpRECIPE_UI_STATUS_LOAD = 1,
	mpRECIPE_UI_STATUS_SAVE = 2,
	mpRECIPE_UI_STATUS_CREATE = 3,
	mpRECIPE_UI_STATUS_REFRESH = 4,
	mpRECIPE_UI_STATUS_NOTIFY = 5,
	mpRECIPE_UI_STATUS_DELETE = 6,
	mpRECIPE_UI_STATUS_RENAME = 7,
	mpRECIPE_UI_STATUS_ERROR = 99,
} MpRecipeUIStatusEnum;
#endif

#ifndef __AS__TYPE_MpRecipeUIMessageBoxType
#define __AS__TYPE_MpRecipeUIMessageBoxType
typedef struct MpRecipeUIMessageBoxType
{	unsigned short LayerStatus;
	MpRecipeUIMessageEnum Type;
	plcbit Confirm;
	plcbit Cancel;
} MpRecipeUIMessageBoxType;
#endif

#ifndef __AS__TYPE_MpRecipeUINewType
#define __AS__TYPE_MpRecipeUINewType
typedef struct MpRecipeUINewType
{	plcstring FileName[256];
	plcbit Create;
} MpRecipeUINewType;
#endif

#ifndef __AS__TYPE_MpRecipeUIRecipeListType
#define __AS__TYPE_MpRecipeUIRecipeListType
typedef struct MpRecipeUIRecipeListType
{	plcstring Names[20][256];
	unsigned short SelectedIndex;
	unsigned short MaxSelection;
	plcbit PageUp;
	plcbit PageDown;
	plcbit StepUp;
	plcbit StepDown;
	float RangeStart;
	float RangeEnd;
	unsigned long Sizes[20];
	plcstring LastModified[20][51];
} MpRecipeUIRecipeListType;
#endif

#ifndef __AS__TYPE_MpRecipeUISortOrderEnum
#define __AS__TYPE_MpRecipeUISortOrderEnum
typedef enum MpRecipeUISortOrderEnum
{	mpRECIPE_UI_SORT_ASCENDING = 0,
	mpRECIPE_UI_SORT_DESCENDING = 1,
	mpRECIPE_UI_SORT_DATE_ASCENDING = 2,
	mpRECIPE_UI_SORT_DATE_DESCENDING = 3,
} MpRecipeUISortOrderEnum;
#endif

#ifndef __AS__TYPE_MpRecipeUIHeaderType
#define __AS__TYPE_MpRecipeUIHeaderType
typedef struct MpRecipeUIHeaderType
{	plcstring Name[101];
	plcstring Description[256];
	plcstring Version[21];
	plcdt DateTime;
} MpRecipeUIHeaderType;
#endif

#ifndef __AS__TYPE_MpRecipeUIRecipeType
#define __AS__TYPE_MpRecipeUIRecipeType
typedef struct MpRecipeUIRecipeType
{	MpRecipeUIRecipeListType List;
	plcbit Load;
	plcbit Save;
	plcstring Filter[256];
	MpRecipeUISortOrderEnum SortOrder;
	plcbit Refresh;
	plcbit UpdateNotification;
	plcbit Delete;
	plcbit Rename;
	plcstring NewFileName[256];
	MpRecipeUIHeaderType Header;
} MpRecipeUIRecipeType;
#endif

#ifndef __AS__TYPE_MpRecipeUIConnectType
#define __AS__TYPE_MpRecipeUIConnectType
typedef struct MpRecipeUIConnectType
{	MpRecipeUIStatusEnum Status;
	MpRecipeUIRecipeType Recipe;
	MpRecipeUINewType New;
	MpRecipeUIMessageBoxType MessageBox;
	unsigned short DefaultLayerStatus;
} MpRecipeUIConnectType;
#endif

_BUR_LOCAL MpRecipeUISetupType UISetup;
_BUR_LOCAL MpRecipeUIConnectType UIConnect;
