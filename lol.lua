local TeleportService = game:GetService("TeleportService")
local HttpService = game:GetService("HttpService")
Webhook_URL = 'https://discord.com/api/webhooks/1363240740058173610/sQ7UPl_pRbM4PMWPuVZ0jtRG3ljF9m06AvFlNzMuRAq6tp84KRJGfrIZWr2jYLdQMpNS'

if not game:IsLoaded() then game.Loaded:Wait() end

task.wait(5)

if game.Players.LocalPlayer.PlayerGui.ScreenGui.Enabled == false then
    game.Players.LocalPlayer.PlayerGui.Intro.Enabled = false
    game.Players.LocalPlayer.PlayerGui.LoadingGui.Enabled = false
    game.Players.LocalPlayer.PlayerGui.ScreenGui.Enabled = true
    game.StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Chat, true)
    game.StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, true)
end
local found = false

function notify(title,text)
    game:GetService("StarterGui"):SetCore("SendNotification",{
    Title = title, -- Required
    Text = text -- Required
})
end

function teleport()
    httprequest = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request

    if httprequest then
        local servers = {}
        local req = httprequest({Url = string.format("https://games.roblox.com/v1/games/%d/servers/Public?sortOrder=Asc&limit=100&excludeFullGames=true", game.PlaceId)})
        local body = HttpService:JSONDecode(req.Body)

        if body and body.data then
            for i, v in next, body.data do
                if type(v) == "table" and tonumber(v.playing) and tonumber(v.maxPlayers) and v.playing < v.maxPlayers and v.id ~= JobId then
                    table.insert(servers, 1, v.id)
                end
            end
        end

        if #servers > 0 then
            TeleportService:TeleportToPlaceInstance(game.PlaceId, servers[math.random(1, #servers)], game.Players.LocalPlayer)
        end
    else
        notify("Incompatible Exploit", "Your exploit does not support this command (missing request)")
    end
end

function sendWebhookNotif(rift)
local response = request( { Url =  Webhook_URL, Method = 'POST', Headers = { ['Content-Type'] = 'application/json' }, Body = HttpService:JSONEncode({ ["content"] = "", ["embeds"] = {{ ["title"] = "A rift has been found!", ["description"] = rift.." has been detected!", ["type"] = "rich", ["color"] = tonumber(0xffffff) }} }) } )
end

local eggs = {
    "man-egg",
    -- "rainbow-egg",
    -- "void-egg",
    "nightmare-egg",
    "event-1",
    "event-2",
    "event-3"
}

notify("Finding eggs...", " ")

for i,v in workspace.Rendered.Rifts:GetChildren() do
    if table.find(eggs, v.Name) then
        if v.Name == "man-egg" then
            notify("Egg Detected!", "Egg: Aura")
            sendWebhookNotif("Aura Egg")
            local Highlight = Instance.new("Highlight")
            Highlight.FillTransparency = 1
            Highlight.Parent = v

            found = true

            firetouchinterest(workspace.Rendered.Generic.Zen.Display, game.Players.LocalPlayer.Character.HumanoidRootPart, 0)
        elseif v.Display.SurfaceGui.Icon.Luck.Text == "x25" then
            notify("Egg Detected!", "Egg:" ..v.Name)
            sendWebhookNotif(v.Name)

            local Highlight = Instance.new("Highlight")
            Highlight.FillTransparency = 1
            Highlight.Parent = v

            found = true

            firetouchinterest(workspace.Rendered.Generic.Zen.Display, game.Players.LocalPlayer.Character.HumanoidRootPart, 0)
        end
    end
end

task.wait(5)

if not found then
    notify("Eggs Undetected", "Might take a while to server hop")
    repeat
        local s,f = pcall(function()
            teleport()
            print("hi")
            task.wait(2)
        end)
    until found == true
end